// Component exports
export { default as Alert, useAlert } from './alert';

// ClassNames export for external reuse
export { alertClassNames } from './alert.styles';

// Type exports (named exports for better tree-shaking)
export type {
  AlertContentProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertIndicatorProps,
  AlertRootProps,
  AlertTitleProps,
} from './alert.types';
