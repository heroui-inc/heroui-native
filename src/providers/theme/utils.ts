import { cn as twcn, type CnOptions } from 'tailwind-variants';

export function cn(...args: CnOptions) {
  return twcn(args)({
    twMerge: true,
    twMergeConfig: {
      extend: {
        classGroups: {
          opacity: [{ opacity: ['disabled'] }],
        },
      },
    },
  });
}
