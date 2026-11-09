import type { ReactElement } from 'react';
import {
  DEFAULT_TOAST_DURATION,
  ToastStore,
  type ToastStackState,
} from '../providers/toast/toast-store';

const component = () => null as unknown as ReactElement;

function ids(store: ToastStore): string[] {
  return store.getSnapshot().toasts.map((toast) => toast.id);
}

describe('ToastStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('adds toasts in order and generates unique ids', () => {
    const store = new ToastStore();
    const first = store.add({ component });
    const second = store.add({ component });

    expect(first).not.toBe(second);
    expect(ids(store)).toEqual([first, second]);
  });

  it('returns the existing id without adding when an explicit id is shown', () => {
    const store = new ToastStore();
    const onShow = jest.fn();
    store.add({ id: 'same', component });
    const snapshot = store.getSnapshot();

    expect(store.add({ id: 'same', component, onShow })).toBe('same');
    expect(onShow).not.toHaveBeenCalled();
    expect(store.getSnapshot()).toBe(snapshot);
  });

  it('creates a new snapshot object on every change', () => {
    const store = new ToastStore();
    const before = store.getSnapshot();
    store.add({ component });

    expect(store.getSnapshot()).not.toBe(before);
    expect(store.getSnapshot().toasts).not.toBe(before.toasts);
  });

  it('notifies subscribers and stops after unsubscribing', () => {
    const store = new ToastStore();
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    store.add({ id: 'a', component });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.remove('a');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  describe('remove', () => {
    it('hides the front toast when called without arguments', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component });
      store.add({ id: 'b', component });
      store.remove();

      expect(ids(store)).toEqual(['a']);
    });

    it('hides one id, an array of ids, or all toasts', () => {
      const store = new ToastStore();
      ['a', 'b', 'c', 'd'].forEach((id) => store.add({ id, component }));

      store.remove('b');
      expect(ids(store)).toEqual(['a', 'c', 'd']);

      store.remove(['a', 'd']);
      expect(ids(store)).toEqual(['c']);

      store.add({ id: 'e', component });
      store.remove('all');
      expect(ids(store)).toEqual([]);
    });

    it('calls onShow when shown and onHide when hidden', () => {
      const store = new ToastStore();
      const onShow = jest.fn();
      const onHide = jest.fn();
      store.add({ id: 'a', component, onShow, onHide });

      expect(onShow).toHaveBeenCalledTimes(1);
      store.remove('a');
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('does nothing for unknown ids', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component });
      const snapshot = store.getSnapshot();
      const listener = jest.fn();
      store.subscribe(listener);

      store.remove('missing');

      expect(store.getSnapshot()).toBe(snapshot);
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('auto-dismiss timers', () => {
    it('hides a toast after its duration', () => {
      const store = new ToastStore();
      const onHide = jest.fn();
      store.add({ id: 'a', component, duration: 1000, onHide });

      jest.advanceTimersByTime(999);
      expect(ids(store)).toEqual(['a']);

      jest.advanceTimersByTime(1);
      expect(ids(store)).toEqual([]);
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('keeps persistent toasts and toasts without a duration', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component, duration: 'persistent' });
      store.add({ id: 'b', component });

      jest.advanceTimersByTime(DEFAULT_TOAST_DURATION * 10);
      expect(ids(store)).toEqual(['a', 'b']);
    });

    it('dismisses a zero-duration toast on the next macrotask, not inline', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component, duration: 0 });

      expect(ids(store)).toEqual(['a']);
      jest.advanceTimersByTime(0);
      expect(ids(store)).toEqual([]);
    });

    it('does not fire the timer of a toast hidden manually', () => {
      const store = new ToastStore();
      const onHide = jest.fn();
      store.add({ id: 'a', component, duration: 1000, onHide });
      store.remove('a');

      jest.advanceTimersByTime(2000);
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('pauses and resumes with the remaining time', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component, duration: 1000 });

      jest.advanceTimersByTime(600);
      store.pauseTimer('a');
      jest.advanceTimersByTime(5000);
      expect(ids(store)).toEqual(['a']);

      store.resumeTimer('a');
      jest.advanceTimersByTime(399);
      expect(ids(store)).toEqual(['a']);
      jest.advanceTimersByTime(1);
      expect(ids(store)).toEqual([]);
    });

    it('clears every timer on dispose', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component, duration: 1000 });
      store.dispose();

      jest.advanceTimersByTime(2000);
      expect(ids(store)).toEqual(['a']);
    });
  });

  describe('stack state', () => {
    it('reports total, positions and the front toast', () => {
      const store = new ToastStore();
      store.add({ id: 'a', component });
      store.add({ id: 'b', component });

      expect(store.getStack()).toEqual({
        total: 2,
        positions: { a: 0, b: 1 },
        frontId: 'b',
      });
    });

    it('calls stack listeners immediately and before subscribers on change', () => {
      const store = new ToastStore();
      const calls: string[] = [];
      const stacks: ToastStackState[] = [];

      store.subscribeStack((stack) => {
        calls.push('stack');
        stacks.push(stack);
      });
      store.subscribe(() => calls.push('snapshot'));

      store.add({ id: 'a', component });
      store.remove('a');

      expect(calls).toEqual([
        'stack',
        'stack',
        'snapshot',
        'stack',
        'snapshot',
      ]);
      expect(stacks.map((stack) => stack.total)).toEqual([0, 1, 0]);
      expect(stacks[1]?.frontId).toBe('a');
      expect(stacks[2]?.frontId).toBeUndefined();
    });

    it('keeps positions consistent when an older toast is removed', () => {
      const store = new ToastStore();
      ['a', 'b', 'c'].forEach((id) => store.add({ id, component }));
      store.remove('a');

      expect(store.getStack()).toEqual({
        total: 2,
        positions: { b: 0, c: 1 },
        frontId: 'c',
      });
    });
  });
});
