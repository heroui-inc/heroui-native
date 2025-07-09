import * as SwitchPrimitivesTypes from '@/primitives/switch/switch.types';

/**
 * Props interface for the Switch thumb icon component
 * Used when thumbIcon is provided as a render function
 */
interface SwitchThumbIconProps {
  /**
   * The width of the thumb icon
   * @type {string | undefined}
   * @default undefined
   */
  width?: string;

  /**
   * The height of the thumb icon
   * @type {string | undefined}
   * @default undefined
   */
  height?: string;

  /**
   * Whether the switch is currently selected/checked
   * @type {boolean}
   */
  isSelected: boolean;

  /**
   * Whether the switch is disabled
   * @type {boolean | undefined}
   * @default false
   */
  isDisabled?: boolean;

  /**
   * The current size variant of the switch
   * @type {'sm' | 'md' | 'lg' | undefined}
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The current color variant of the switch
   * @type {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined}
   */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';

  /**
   * Additional className for styling the thumb icon
   * @type {string | undefined}
   * @default undefined
   */
  className?: string;
}

/**
 * Props interface for the Switch component
 * Provides a comprehensive set of customization options for the switch behavior and appearance
 */
interface SwitchProps extends SwitchPrimitivesTypes.RootProps {
  /**
   * The ref for the root element
   * @type {React.RefObject<SwitchPrimitivesTypes.RootRef> | undefined}
   * @default undefined
   */
  ref?: React.RefObject<SwitchPrimitivesTypes.RootRef>;

  /**
   * The label content of the switch, typically displayed alongside the toggle
   * @type {React.ReactNode | undefined}
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Whether the switch is in a read-only state (selected state cannot be changed)
   * @type {boolean | undefined}
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * The size variant of the switch affecting its dimensions
   * @type {'sm' | 'md' | 'lg' | undefined}
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The color theme variant of the switch
   * @type {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined}
   * @default "primary"
   */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';

  /**
   * The icon to be displayed inside the thumb, can be a component or render function
   * @type {React.ReactNode | ((props: SwitchThumbIconProps) => React.ReactNode) | undefined}
   * @default undefined
   */
  thumbIcon?:
    | React.ReactNode
    | ((props: SwitchThumbIconProps) => React.ReactNode);

  /**
   * Content to be displayed at the start (left) side of the switch
   * @type {React.ReactNode | undefined}
   * @default undefined
   */
  startContent?: React.ReactNode;

  /**
   * Content to be displayed at the end (right) side of the switch
   * @type {React.ReactNode | undefined}
   * @default undefined
   */
  endContent?: React.ReactNode;

  /**
   * Custom class names for different parts of the switch using slot-based styling
   * @type {object | undefined}
   * @default undefined
   */
  classNames?: {
    /** Base wrapper element class name */
    base?: string;
    /** Switch wrapper element class name */
    wrapper?: string;
    /** Thumb (toggle) element class name */
    thumb?: string;
    /** Thumb icon element class name */
    thumbIcon?: string;
    /** Label text element class name */
    label?: string;
    /** Start content element class name */
    startContent?: string;
    /** End content element class name */
    endContent?: string;
  };

  /**
   * Additional className for the base switch element
   * @type {string | undefined}
   * @default undefined
   */
  className?: string;

  /**
   * Whether to disable all animations and transitions
   * @type {boolean | undefined}
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * Callback function fired when the switch is pressed (regardless of state change)
   * @type {(() => void) | undefined}
   * @default undefined
   */
  onPress?: () => void;
}

/**
 * Base dimensions for switch component sizing
 * Contains the fundamental measurements used across all switch variants
 */
type BaseDimensions = {
  /** Width of the switch track */
  switchWidth: number;
  /** Size (width/height) of the switch thumb */
  switchThumbSize: number;
  /** Horizontal padding inside the switch track */
  switchHorizontalPadding: number;
  /** Vertical padding inside the switch track */
  switchVerticalPadding: number;
};

/**
 * Complete dimensions interface for switch component
 * Extends BaseDimensions with calculated height and animation values
 */
interface Dimensions extends BaseDimensions {
  /** Calculated height of the switch track */
  switchHeight: number;
  /** Maximum translation distance for thumb animation */
  switchMaxTranslateX: number;
}

/**
 * Map of base dimensions for each switch size variant
 * Provides size-specific measurements for sm, md, and lg variants
 */
type BaseDimensionsMap = {
  /** Small switch variant dimensions */
  sm: BaseDimensions;
  /** Medium switch variant dimensions */
  md: BaseDimensions;
  /** Large switch variant dimensions */
  lg: BaseDimensions;
};

export type {
  BaseDimensions,
  BaseDimensionsMap,
  Dimensions,
  SwitchProps,
  SwitchThumbIconProps,
};
