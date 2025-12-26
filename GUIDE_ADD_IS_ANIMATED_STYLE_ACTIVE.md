# Guide: Adding `isAnimatedStyleActive` Prop to Components

This guide explains how to add the `isAnimatedStyleActive` prop to components that use animated styles from `react-native-reanimated`.

## Overview

The `isAnimatedStyleActive` prop allows consumers to disable the default animated styles and implement custom styling logic. When set to `false`, the animated style is removed from the component's style array.

## Step-by-Step Implementation

### 1. Add the Prop to Types File

**Location**: `[component-name].types.ts`

**Position**: Place the prop **immediately after** the `animation` prop in the component's props interface.

**Code to Add**:

```typescript
/**
 * Whether animated styles (react-native-reanimated) are active
 * When `false`, the animated style is removed and you can implement custom logic
 * This prop should only be used when you want to write custom styling logic instead of the default animated styles
 * @default true
 */
isAnimatedStyleActive?: boolean;
```

**Example** (from `text-field.types.ts`):

```typescript
export interface TextFieldInputProps extends TextInputProps {
  // ... other props ...
  /**
   * Animation configuration for input focus/blur and error state transitions
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: TextFieldInputAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}
```

### 2. Add Prop to Component Destructuring

**Location**: `[component-name].tsx`

**Position**: Place the prop **immediately after** `animation` in the destructuring assignment.

**Code Pattern**:

```typescript
const ComponentName = forwardRef<RefType, ComponentProps>((props, ref) => {
  const {
    // ... other props ...
    animation,
    isAnimatedStyleActive = true,
    // ... rest of props ...
  } = props;
```

**Example** (from `text-field.tsx`):

```typescript
const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      children,
      isInvalid: localIsInvalid,
      className,
      classNames,
      style,
      animation,
      isAnimatedStyleActive = true,
      onFocus,
      onBlur,
      ...restProps
    } = props;
```

### 3. Implement Style Logic

**Location**: `[component-name].tsx`

After extracting the animated style from your animation hook, create a conditional style variable based on `isAnimatedStyleActive`.

**Important**: If you're creating a new style variable following the `[part-name]Style` pattern, you must also rename any existing className variable to match the `[part-name]ClassName` pattern (e.g., if you create `indicatorStyle`, rename `tvStyles` to `indicatorClassName`).

#### Pattern A: When component has both `style` and `className` props

If your component uses both `style` and `className`, and the animated style is applied to a container element:

**Variable Naming Convention**:

- Style variable: `[part-name]Style` (e.g., `containerStyle`, `rootStyle`, `indicatorStyle`)
- ClassName variable: `[part-name]ClassName` (e.g., `containerClassName`, `rootClassName`, `indicatorClassName`)

**Code Pattern**:

```typescript
const { animatedContainerStyle } = useComponentAnimation({
  animation,
  // ... other params ...
});

const containerStyle = isAnimatedStyleActive
  ? [animatedContainerStyle, styleSheet.borderCurve, style]
  : [styleSheet.borderCurve, style];

// Usage
<Animated.View className={containerClassName} style={containerStyle}>
```

**Example** (from `text-field.tsx`):

```typescript
const {
  animatedContainerStyle,
  handleFocusAnimation,
  handleBlurAnimation,
} = useTextFieldInputAnimation({
  animation,
  isInvalid,
});

const containerStyle = isAnimatedStyleActive
  ? [animatedContainerStyle, styleSheet.borderCurve, style]
  : [styleSheet.borderCurve, style];

// Usage
<Animated.View className={containerClassName} style={containerStyle}>
```

#### Pattern B: When animated style is standalone (no additional static styles)

If the animated style is the only style being applied conditionally:

**Code Pattern**:

```typescript
const { animatedStyle } = useComponentAnimation({
  animation,
  // ... other params ...
});

const containerStyle = isAnimatedStyleActive
  ? animatedStyle
  : style;

// Usage
<Animated.View className={containerClassName} style={containerStyle}>
```

**Example** (alternative pattern from `text-field.tsx`):

```typescript
const containerStyle = isAnimatedStyleActive ? animatedContainerStyle : style;
```

**Example** (from `accordion.tsx` - Indicator component):

```typescript
// Before: tvStyles was used for className
const tvStyles = accordionStyles.indicator({ className });

// After: Rename to indicatorClassName to match indicatorStyle naming
const indicatorClassName = accordionStyles.indicator({ className });

const { rContainerStyle } = useAccordionIndicatorAnimation({
  animation,
  isExpanded,
});

const indicatorStyle = isAnimatedStyleActive
  ? [rContainerStyle, style]
  : style;

// Usage
<AnimatedIndicator
  className={indicatorClassName}
  style={indicatorStyle}
/>
```

### 4. Variable Naming Rules

**Critical**: Follow the naming pattern `[part-name]Style` and `[part-name]ClassName` where `[part-name]` matches:

- If style variable is `containerStyle` → className variable must be `containerClassName`
- If style variable is `rootStyle` → className variable must be `rootClassName`
- If style variable is `indicatorStyle` → className variable must be `indicatorClassName`
- If style variable is `itemStyle` → className variable must be `itemClassName`

The `[part-name]` should match the semantic meaning of the element being styled (container, root, indicator, item, etc.).

**Note**: When adding `isAnimatedStyleActive`, if you create a new style variable (e.g., `indicatorStyle`), you must also rename any existing className variable (e.g., `tvStyles` → `indicatorClassName`) to maintain consistency with the naming convention.

## Complete Example

Here's a complete example showing all steps together:

### Types File (`example-component.types.ts`):

```typescript
export interface ExampleComponentProps extends ViewProps {
  // ... other props ...
  /**
   * Animation configuration
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: ExampleComponentAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}
```

### Component File (`example-component.tsx`):

```typescript
const ExampleComponent = forwardRef<ViewRef, ExampleComponentProps>(
  (props, ref) => {
    const {
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      ...restProps
    } = props;

    const containerClassName = exampleStyles.container({
      className,
    });

    const {
      animatedContainerStyle,
    } = useExampleComponentAnimation({
      animation,
    });

    const containerStyle = isAnimatedStyleActive
      ? [animatedContainerStyle, styleSheet.borderCurve, style]
      : [styleSheet.borderCurve, style];

    return (
      <Animated.View
        ref={ref}
        className={containerClassName}
        style={containerStyle}
        {...restProps}
      >
        {/* content */}
      </Animated.View>
    );
  }
);
```

### 5. Update Component Documentation

**Location**: `src/components/[component-name]/[component-name].md`

Add the `isAnimatedStyleActive` prop to the component's API Reference table in the documentation file. The prop should be placed immediately after the `animation` prop in the table.

**Code Pattern**:

```markdown
| prop                    | type                 | default | description                                                  |
| ----------------------- | -------------------- | ------- | ------------------------------------------------------------ |
| `animation`             | `ComponentAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`            | `true`  | Whether animated styles (react-native-reanimated) are active |
| `...Animated.ViewProps` | `Animated.ViewProps` | -       | All Reanimated Animated.View props are supported             |
```

**Example** (from `accordion.md` - Accordion.Indicator):

```markdown
### Accordion.Indicator

| prop                    | type                          | default | description                                                            |
| ----------------------- | ----------------------------- | ------- | ---------------------------------------------------------------------- |
| `children`              | `React.ReactNode`             | -       | Custom indicator content, if not provided defaults to animated chevron |
| `className`             | `string`                      | -       | Additional CSS classes                                                 |
| `iconProps`             | `AccordionIndicatorIconProps` | -       | Icon configuration                                                     |
| `animation`             | `AccordionIndicatorAnimation` | -       | Animation configuration for indicator                                  |
| `isAnimatedStyleActive` | `boolean`                     | `true`  | Whether animated styles (react-native-reanimated) are active           |
| `...Animated.ViewProps` | `Animated.ViewProps`          | -       | All Reanimated Animated.View props are supported                       |
```

## Checklist

When adding `isAnimatedStyleActive` to a component, ensure:

- [ ] Prop is added to types file with exact comment from `text-field.types.ts` (lines 218-224)
- [ ] Prop is placed immediately after `animation` prop in types interface
- [ ] Prop is placed immediately after `animation` in component prop destructuring
- [ ] Default value `= true` is set in destructuring
- [ ] Style variable follows pattern `[part-name]Style`
- [ ] If className exists, it follows pattern `[part-name]ClassName` matching the style variable name
- [ ] Conditional logic correctly includes/excludes animated style based on `isAnimatedStyleActive`
- [ ] All static styles (like `styleSheet.borderCurve`) are preserved when `isAnimatedStyleActive` is `false`
- [ ] Prop is added to component documentation file (`[component-name].md`) API Reference table immediately after `animation` prop

## Notes

- The prop defaults to `true` to maintain backward compatibility
- When `false`, only the animated style is removed; all other styles (static stylesheet styles, user-provided `style` prop) remain
- This prop is intended for advanced use cases where developers need full control over styling
- The naming convention ensures consistency across all components
