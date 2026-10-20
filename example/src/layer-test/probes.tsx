// TEMPORARY: uniwind cascade-layer verification harness. Do not commit.

// Resolves every BEM class alone and combined with override utilities (in both
// orders) through uniwind, and stores the resolved RN styles on a global map.
import { memo } from 'react';
import { useResolveClassNames } from 'uniwind';
import { BEM_CLASSES, OVERRIDES } from './probe-data';

const g = globalThis as any;
g.__layerProbe = g.__layerProbe ?? {};

export const PROBE_CLASS_NAMES: string[] = (() => {
  const list: string[] = [OVERRIDES.ov1, OVERRIDES.ov2, OVERRIDES.ov3];
  for (const cls of BEM_CLASSES) {
    list.push(
      cls,
      `${cls} ${OVERRIDES.ov1}`,
      `${OVERRIDES.ov1} ${cls}`,
      `${cls} ${OVERRIDES.ov2}`,
      `${OVERRIDES.ov2} ${cls}`,
      `${cls} ${OVERRIDES.ov3}`
    );
  }
  return list;
})();

const Probe = memo(({ className }: { className: string }) => {
  const style = useResolveClassNames(className);
  g.__layerProbe[className] = style;
  return null;
});

export const Probes = () => (
  <>
    {PROBE_CLASS_NAMES.map((className) => (
      <Probe key={className} className={className} />
    ))}
  </>
);
