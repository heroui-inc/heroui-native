import type { ToastItem } from './types';

/**
 * Default time in milliseconds before a toast hides itself
 */
export const DEFAULT_TOAST_DURATION = 4000;

/**
 * Immutable snapshot of the toast list. A new object (and a new `toasts`
 * array) is created on every change, so `useSyncExternalStore` consumers can
 * compare snapshots by reference.
 */
export interface ToastStoreSnapshot {
  /**
   * Toasts in the order they were shown; the last one is the front toast
   */
  readonly toasts: readonly ToastItem[];
}

/**
 * Stack state the animated styles read on the UI thread. Written as one
 * object so the count, the per-toast positions and the front toast always
 * describe the same list.
 */
export interface ToastStackState {
  /**
   * Number of toasts in the stack, including queued ones behind it
   */
  total: number;
  /**
   * Index of every toast in the stack, keyed by toast ID
   */
  positions: Record<string, number>;
  /**
   * ID of the front (newest) toast, or `undefined` when the stack is empty
   */
  frontId: string | undefined;
}

/**
 * A toast item as accepted by `ToastStore.add`, before an ID is assigned
 */
export type ToastStoreEntry = Omit<ToastItem, 'id'> & { id?: string };

type Listener = () => void;

type StackListener = (stack: ToastStackState) => void;

interface ToastTimer {
  timeout: ReturnType<typeof setTimeout> | undefined;
  /** Time left when the timer was last started or paused */
  remaining: number;
  /** When the running timer was started, for computing the time left */
  startedAt: number;
}

/**
 * Whether a duration schedules an auto-dismiss: a finite, non-negative
 * number. `'persistent'`, `Infinity` and invalid numbers keep the toast until
 * it is hidden manually.
 */
function hasAutoDismiss(duration: ToastItem['duration']): duration is number {
  return (
    typeof duration === 'number' &&
    !Number.isNaN(duration) &&
    duration >= 0 &&
    duration !== Infinity
  );
}

/**
 * Framework-agnostic toast state for one `ToastProvider`.
 *
 * Owns the toast list, the auto-dismiss timers and `onShow` / `onHide`
 * callbacks. React reads it through `useSyncExternalStore`; the UI thread
 * gets the stack layout through `subscribeStack`. All public methods are
 * stable arrow functions, so they can be handed to components without
 * breaking memoization.
 */
export class ToastStore {
  private snapshot: ToastStoreSnapshot = { toasts: [] };

  private readonly listeners = new Set<Listener>();

  private readonly stackListeners = new Set<StackListener>();

  private readonly timers = new Map<string, ToastTimer>();

  private idCounter = 0;

  /**
   * Upper bound on queued toasts; `undefined` keeps every toast
   */
  private maxToasts: number | undefined;

  // --------------------------------------------------
  // Configuration

  /**
   * Sets how many toasts the queue keeps. When a new toast would exceed it,
   * the oldest toasts are hidden as if `hide(id)` had been called for them.
   * Values that are not a positive finite number turn the limit off.
   * Applies from the next `add` onwards; already queued toasts are kept.
   */
  setMaxToasts = (maxToasts: number | undefined): void => {
    this.maxToasts =
      typeof maxToasts === 'number' &&
      Number.isFinite(maxToasts) &&
      maxToasts >= 1
        ? Math.floor(maxToasts)
        : undefined;
  };

  // --------------------------------------------------
  // Subscription

  /**
   * Subscribes to snapshot changes (`useSyncExternalStore` contract)
   */
  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /**
   * Returns the current immutable snapshot
   */
  getSnapshot = (): ToastStoreSnapshot => this.snapshot;

  /**
   * Subscribes to stack layout changes. The listener is called synchronously
   * on every change, before React re-renders, and once immediately with the
   * current stack.
   */
  subscribeStack = (listener: StackListener): (() => void) => {
    this.stackListeners.add(listener);
    listener(this.getStack());
    return () => {
      this.stackListeners.delete(listener);
    };
  };

  /**
   * Builds the stack layout for the current toast list
   */
  getStack = (): ToastStackState => {
    const { toasts } = this.snapshot;
    const positions: Record<string, number> = {};
    toasts.forEach((toast, index) => {
      positions[toast.id] = index;
    });
    return {
      total: toasts.length,
      positions,
      frontId: toasts[toasts.length - 1]?.id,
    };
  };

  // --------------------------------------------------
  // Mutations

  /**
   * Adds a toast and starts its auto-dismiss timer.
   *
   * When `entry.id` matches a toast that is already shown, nothing is added
   * and the existing ID is returned.
   *
   * When a `maxToasts` limit is set and the new toast exceeds it, the oldest
   * toasts are removed in the same commit (so the stack never renders over
   * the limit) and their `onHide` callbacks run before the new `onShow`.
   *
   * @returns The ID of the shown (or already shown) toast
   */
  add = (entry: ToastStoreEntry): string => {
    if (entry.id !== undefined) {
      const existing = this.snapshot.toasts.find(
        (toast) => String(toast.id) === String(entry.id)
      );
      if (existing) return existing.id;
    }

    const id = entry.id ?? `toast-${Date.now()}-${this.idCounter++}`;
    const item: ToastItem = { ...entry, id };

    const next = [...this.snapshot.toasts, item];
    const overflow =
      this.maxToasts === undefined ? 0 : next.length - this.maxToasts;
    const dropped = overflow > 0 ? next.slice(0, overflow) : [];

    dropped.forEach((toast) => this.clearTimer(toast.id));

    this.commit(overflow > 0 ? next.slice(overflow) : next);

    dropped.forEach((toast) => toast.onHide?.());
    item.onShow?.();

    /**
     * `duration: 0` is scheduled like any other duration, so the toast is
     * dismissed on the next macrotask rather than inside the caller's
     * `show()` call.
     */
    if (hasAutoDismiss(item.duration)) {
      this.startTimer(id, item.duration);
    }

    return id;
  };

  /**
   * Removes one or more toasts and calls their `onHide` callbacks.
   * - No argument: hides the last (front) toast
   * - `'all'`: hides every toast
   * - ID or array of IDs: hides those toasts
   */
  remove = (ids?: string | string[] | 'all'): void => {
    const { toasts } = this.snapshot;
    if (toasts.length === 0) return;

    let toRemove: ToastItem[];
    if (ids === 'all') {
      toRemove = [...toasts];
    } else if (ids === undefined) {
      const front = toasts[toasts.length - 1];
      toRemove = front ? [front] : [];
    } else {
      const idSet = new Set(
        (Array.isArray(ids) ? ids : [ids]).map((id) => String(id))
      );
      toRemove = toasts.filter((toast) => idSet.has(String(toast.id)));
    }

    if (toRemove.length === 0) return;

    toRemove.forEach((toast) => this.clearTimer(toast.id));

    const removedIds = new Set(toRemove.map((toast) => toast.id));
    this.commit(
      ids === 'all' ? [] : toasts.filter((toast) => !removedIds.has(toast.id))
    );

    toRemove.forEach((toast) => toast.onHide?.());
  };

  // --------------------------------------------------
  // Timers

  /**
   * Pauses the auto-dismiss timer of a toast (e.g. while it is dragged)
   */
  pauseTimer = (id: string): void => {
    const timer = this.timers.get(id);
    if (!timer || timer.timeout === undefined) return;
    clearTimeout(timer.timeout);
    timer.timeout = undefined;
    timer.remaining = Math.max(
      0,
      timer.remaining - (Date.now() - timer.startedAt)
    );
  };

  /**
   * Resumes a paused auto-dismiss timer with the time it had left
   */
  resumeTimer = (id: string): void => {
    const timer = this.timers.get(id);
    if (!timer || timer.timeout !== undefined) return;
    this.startTimer(id, timer.remaining);
  };

  /**
   * Clears every timer. Call when the owning provider unmounts so no timer
   * outlives the tree it dispatches into.
   */
  dispose = (): void => {
    this.timers.forEach((timer) => {
      if (timer.timeout !== undefined) clearTimeout(timer.timeout);
    });
    this.timers.clear();
  };

  private startTimer(id: string, duration: number): void {
    this.clearTimer(id);
    this.timers.set(id, {
      remaining: duration,
      startedAt: Date.now(),
      timeout: setTimeout(() => {
        this.timers.delete(id);
        this.remove(id);
      }, duration),
    });
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (!timer) return;
    if (timer.timeout !== undefined) clearTimeout(timer.timeout);
    this.timers.delete(id);
  }

  // --------------------------------------------------

  /**
   * Replaces the snapshot and notifies listeners. Stack listeners run first,
   * so the stack layout is on its way to the UI thread before React
   * re-renders the new list.
   */
  private commit(toasts: ToastItem[]): void {
    this.snapshot = { toasts };

    if (this.stackListeners.size > 0) {
      const stack = this.getStack();
      this.stackListeners.forEach((listener) => listener(stack));
    }

    this.listeners.forEach((listener) => listener());
  }
}
