import { snapToStep } from '../primitives/slider/slider.utils';

describe('snapToStep', () => {
  it('snaps to the nearest integer step', () => {
    expect(snapToStep(42.4, 0, 100, 1)).toBe(42);
    expect(snapToStep(42.6, 0, 100, 5)).toBe(45);
  });

  it('clamps the snapped value to the range', () => {
    expect(snapToStep(-3, 0, 10, 1)).toBe(0);
    expect(snapToStep(13, 0, 10, 1)).toBe(10);
  });

  it('returns values free of floating point noise for decimal steps', () => {
    expect(snapToStep(0.3, 0, 1, 0.1)).toBe(0.3);
    expect(snapToStep(0.62, 0, 1, 0.1)).toBe(0.6);
    expect(snapToStep(0.7, 0, 1, 0.1)).toBe(0.7);
    expect(snapToStep(0.57, 0, 1, 0.01)).toBe(0.57);
  });

  it('respects the precision of a decimal minimum value', () => {
    expect(snapToStep(0.36, 0.05, 1, 0.1)).toBe(0.35);
  });

  it('supports steps written in exponent notation', () => {
    expect(snapToStep(0.0000003, 0, 1, 1e-7)).toBe(0.0000003);
  });
});
