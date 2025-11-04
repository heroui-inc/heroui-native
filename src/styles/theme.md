# Theming

HeroUI Native uses a powerful theming system built on top of [Uniwind](https://docs.uniwind.dev), providing extensive customization options while maintaining consistency across light and dark modes.

## Setup

### 1. Set Up Uniwind

Follow the [Uniwind installation guide](https://docs.uniwind.dev/quickstart) to set up Tailwind CSS for React Native.

If you're migrating from NativeWind, see the [migration guide](https://docs.uniwind.dev/migration-from-nativewind).

### 2. Configure global.css

Inside your `global.css` file add the following imports:

```css
@import 'tailwindcss';
@import 'uniwind';

@import 'heroui-native/styles';

// Path to the heroui-native lib inside node_modules from the root of your project
@source './node_modules/heroui-native/lib';
```

## Theme Structure

The HeroUI Native theme system is built on two layers of CSS variables:

### Base Variables

Base variables are defined in [variables.css](./variables.css) and serve as the foundation for the theme. These variables change between light and dark modes and are the source from which all other theme colors are calculated.

#### Primitive Colors (constant across themes)

```css
--white: oklch(100% 0 0);
--black: oklch(0% 0 0);
--snow: oklch(0.9911 0 0);
--eclipse: oklch(0.2103 0.0059 285.89);
```

#### Base Radius

```css
--radius: 0.5rem; /* Default base radius */
```

#### Opacity

```css
--opacity-disabled: 0.5;
```

#### Theme-Specific Base Colors

**Light Mode:**

- `--background`: Background color for the app
- `--foreground`: Primary text color
- `--surface`: Background for non-overlay components (cards, accordions)
- `--surface-foreground`: Text color on surface
- `--overlay`: Background for floating/overlay components (dialogs, popovers, modals)
- `--overlay-foreground`: Text color on overlay
- `--muted`: Muted text color
- `--default`: Default component background
- `--default-foreground`: Default component text
- `--accent`: Accent/primary color
- `--accent-foreground`: Text on accent color

**Dark Mode:**
Same variables as light mode but with adjusted values optimized for dark backgrounds. Notably, `--overlay` is lighter than `--surface` in dark mode to provide better contrast for floating components.

#### Status Colors

- `--success`: Success state color
- `--success-foreground`: Text on success
- `--warning`: Warning state color
- `--warning-foreground`: Text on warning
- `--danger`: Danger/error state color
- `--danger-foreground`: Text on danger

#### Form Field Base Colors

- `--field-background`: Form input background
- `--field-foreground`: Form input text
- `--field-placeholder`: Placeholder text
- `--field-border`: Form input border (transparent by default)

#### Miscellaneous Colors

- `--border`: Border color (transparent by default)
- `--divider`: Divider line color
- `--link`: Link text color

### Calculated Variables

Calculated variables are defined in [theme.css](./theme.css) and are automatically derived from base variables using `color-mix()` functions. These provide consistent variations without manual definition.

#### Color Tokens

All base colors are exposed as `--color-*` tokens:

```css
--color-background
--color-foreground
--color-surface
--color-accent
--color-default
--color-danger
/* ... and many more */
```

#### Background Shades

Progressive background variations for layering:

```css
--color-background-secondary    /* 96% background, 4% foreground */
--color-background-tertiary     /* 92% background, 8% foreground */
--color-background-quaternary   /* 86% background, 14% foreground */
```

#### Hover States

Automatically calculated hover states for all color variants:

```css
--color-default-hover
--color-accent-hover
--color-success-hover
--color-warning-hover
--color-danger-hover
```

#### Soft Colors

Translucent versions (15% opacity) with hover states:

```css
--color-accent-soft              /* 15% accent */
--color-accent-soft-foreground
--color-accent-soft-hover        /* 20% accent */
--color-danger-soft
--color-warning-soft
--color-success-soft
```

#### Surface Levels

Progressive surface shades for nested components:

```css
--color-surface-secondary
--color-surface-tertiary
--color-surface-quaternary
--color-on-surface
--color-on-surface-hover
```

#### Form Field Tokens

```css
--color-field
--color-field-hover
--color-field-focus
--color-field-foreground
--color-field-placeholder
--color-field-border
--color-field-border-hover
--color-field-border-focus
--radius-field
--border-width-field
```

#### Radius Tokens

Calculated from base `--radius` for consistency:

```css
--radius-xs     /* radius * 0.25 = 0.125rem (2px) */
--radius-sm     /* radius * 0.5  = 0.25rem (4px) */
--radius-md     /* radius * 0.75 = 0.375rem (6px) */
--radius-lg     /* radius * 1    = 0.5rem (8px) */
--radius-xl     /* radius * 1.5  = 0.75rem (12px) */
--radius-2xl    /* radius * 2    = 1rem (16px) */
--radius-3xl    /* radius * 3    = 1.5rem (24px) */
--radius-4xl    /* radius * 4    = 2rem (32px) */
```

## Customization

HeroUI Native supports extensive theming customization through Uniwind's theming system.

### Custom Colors

You can override any theme variable to customize colors:

```css
@theme {
  @variant light {
    --accent: oklch(0.65 0.25 270); /* Custom purple accent */
    --background: oklch(0.98 0 0); /* Custom background */
  }

  @variant dark {
    --accent: oklch(0.65 0.25 270);
    --background: oklch(0.15 0 0);
  }
}
```

### Custom Themes

Create multiple themes using Uniwind's variant system:

```css
@layer theme {
  :root {
    @variant ocean {
      --accent: oklch(0.6 0.2 230);
      --background: oklch(0.95 0.02 230);
    }

    @variant forest {
      --accent: oklch(0.65 0.18 150);
      --background: oklch(0.96 0.01 150);
    }
  }
}
```

**Important:** When adding custom themes, you must register them in your Metro config:

```js
module.exports = withUniwindConfig(wrapWithReanimatedMetroConfig(config), {
  cssEntryFile: './global.css',
  dtsFile: './src/uniwind.d.ts',
  extraThemes: [
    'ocean',
    'forest',
    'lavender-light',
    'lavender-dark',
    'mint-light',
    'mint-dark',
    'sky-light',
    'sky-dark',
  ],
});
```

Apply themes in your app:

```tsx
import { useColorScheme } from 'uniwind';

function App() {
  const { setColorScheme } = useColorScheme();

  return <Button onPress={() => setColorScheme('ocean')}>Ocean Theme</Button>;
}
```

For complete custom theme documentation, see [Uniwind Custom Themes Guide](https://docs.uniwind.dev/theming/custom-themes).

> **Note:** If you need the color scheme from the alpha version of HeroUI Native, you can find it in [example/themes/alpha.css](../../example/themes/alpha.css).

### Radius Customization

Change the global border radius scale:

```css
@theme {
  --radius: 0.75rem; /* Increase for rounder components */
}
```

All radius tokens (`--radius-xs` through `--radius-4xl`) automatically scale accordingly.

### Advanced Customization

For comprehensive theming capabilities, refer to the [Uniwind theming documentation](https://docs.uniwind.dev/theming/basics):

- Creating multiple color schemes
- Custom design tokens
- Theme inheritance
- Dynamic theme switching
- Per-component theme overrides

## Custom Fonts

To use a custom font family in your app, override the font CSS variables:

```css
@theme {
  --font-normal: 'YourFont-Regular';
  --font-medium: 'YourFont-Medium';
  --font-semibold: 'YourFont-SemiBold';
}
```

All HeroUI Native components automatically use these font variables, ensuring consistent typography throughout your app.

**Note:** Make sure your custom fonts are properly loaded in your React Native app before applying these variables. See [React Native font documentation](https://reactnative.dev/docs/text#limited-style-inheritance) for loading custom fonts.

## Utilities

### useThemeColor Hook

Quick access to theme colors in hex format within your components:

```tsx
import { useThemeColor } from 'heroui-native';

function MyComponent() {
  const accentColor = useThemeColor('accent');
  const dangerColor = useThemeColor('danger');

  return (
    <View style={{ borderColor: accentColor }}>
      <Text style={{ color: dangerColor }}>Error message</Text>
    </View>
  );
}
```

**Source:** [use-theme-color.ts](../helpers/theme/hooks/use-theme-color.ts)

**Type signature:**

```tsx
useThemeColor(themeColor: ThemeColor): string
```

Available theme colors include: `background`, `foreground`, `surface`, `accent`, `default`, `success`, `warning`, `danger`, and all their variants (hover, soft, etc.).

### cn Utility

The `cn` utility function merges Tailwind CSS classes with proper conflict resolution:

```tsx
import { cn } from 'heroui-native';

function MyComponent({ className }) {
  return (
    <View
      className={cn(
        'bg-background p-4 rounded-lg',
        'border border-divider',
        className
      )}
    />
  );
}
```

**Source:** [cn.ts](../helpers/theme/utils/cn.ts)

The `cn` utility is powered by `tailwind-variants` and includes:

- Automatic Tailwind class merging (`twMerge: true`)
- Custom opacity class group support
- Proper conflict resolution (later classes override earlier ones)

**Example with conflicts:**

```tsx
// 'bg-accent' overrides 'bg-background'
cn('bg-background p-4', 'bg-accent');
// Result: 'p-4 bg-accent'
```

## Dark Mode

HeroUI Native automatically supports dark mode through Uniwind. The theme switches between light and dark variants based on the system or manual selection:

```tsx
import { useColorScheme } from 'uniwind';

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Button
      onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
    >
      Toggle {colorScheme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

All theme variables automatically adjust based on the active color scheme.
