# Colors

HeroUI Native uses CSS variables for colors that automatically switch between light and dark themes. All colors use the `oklch` color space for better color transitions.

## How It Works

HeroUI Native's color system is built on top of [Tailwind CSS v4](https://tailwindcss.com/docs/theme)'s theme via [Uniwind](https://uniwind.dev/). When you import `heroui-native/styles`, it uses Tailwind's built-in color palettes and maps them to semantic variables.

**Naming pattern:**

- Colors without a suffix are backgrounds (e.g., `--accent`)
- Colors with `-foreground` are for text on that background (e.g., `--accent-foreground`)

**Usage:**

```tsx
import { View, Text } from 'react-native';

// This gives you the right background and text colors
<View className="bg-background flex-1">
  <View className="bg-accent p-4 rounded-lg">
    <Text className="text-accent-foreground">Hello</Text>
  </View>
</View>;
```

### Base Colors

These four colors stay the same in all themes:

```css
--white: oklch(100% 0 0);
--black: oklch(0% 0 0);
--snow: oklch(0.9911 0 0);
--eclipse: oklch(0.2103 0.0059 285.89);
```

### Background & Surface

These colors define the main background layers and their foreground text colors:

```css
/* Light theme */
--background: oklch(0.9702 0 0);
--foreground: var(--eclipse);
--surface: var(--white);
--surface-foreground: var(--foreground);
--overlay: var(--white);
--overlay-foreground: var(--foreground);
--backdrop: oklch(0% 0 0 / 20%);

/* Dark theme */
--background: oklch(12% 0.005 285.823);
--foreground: var(--snow);
--surface: oklch(0.2103 0.0059 285.89);
--surface-foreground: var(--foreground);
--overlay: oklch(0.2103 0.0059 285.89);
--overlay-foreground: var(--foreground);
--backdrop: oklch(0% 0 0 / 20%);
```

### Primary Colors

**Accent** — Your main brand color (used for primary actions)

```css
/* Light and dark theme (same value) */
--accent: oklch(0.6204 0.195 253.83);
--accent-foreground: var(--snow);
```

### Status Colors

For alerts, validation, and status messages:

```css
/* Light theme */
--success: oklch(0.7329 0.1935 150.81);
--success-foreground: var(--eclipse);
--warning: oklch(0.7819 0.1585 72.33);
--warning-foreground: var(--eclipse);
--danger: oklch(0.6532 0.2328 25.74);
--danger-foreground: var(--snow);

/* Dark theme */
--success: oklch(0.7329 0.1935 150.81);
--success-foreground: var(--eclipse);
--warning: oklch(0.8203 0.1388 76.34);
--warning-foreground: var(--eclipse);
--danger: oklch(0.594 0.1967 24.63);
--danger-foreground: var(--snow);
```

### Form Field Colors

For consistent form field styling across input components:

```css
/* Light theme */
--field-background: var(--white);
--field-foreground: oklch(0.2103 0.0059 285.89);
--field-placeholder: var(--muted);
--field-border: transparent;

/* Dark theme */
--field-background: oklch(0.2103 0.0059 285.89);
--field-foreground: var(--foreground);
--field-placeholder: var(--muted);
--field-border: transparent;
```

### Other Colors

```css
/* Light theme */
--muted: oklch(0.5517 0.0138 285.94);
--default: oklch(94% 0.001 286.375);
--default-foreground: var(--eclipse);
--border: oklch(90% 0.004 286.32);
--separator: oklch(74% 0.004 286.32);
--focus: var(--accent);
--link: var(--foreground);

/* Dark theme */
--muted: oklch(70.5% 0.015 286.067);
--default: oklch(27.4% 0.006 286.033);
--default-foreground: var(--snow);
--border: oklch(28% 0.006 286.033);
--separator: oklch(40% 0.006 286.033);
--focus: var(--accent);
--link: var(--foreground);
```

## How to Use Colors

**In your components:**

```tsx
import { View, Text } from 'react-native';
import { Button } from 'heroui-native';

<View className="bg-background flex-1 p-4">
  <Text className="text-foreground mb-4">Content</Text>
  <Button variant="primary" className="bg-accent">
    <Button.Label className="text-accent-foreground">Click me</Button.Label>
  </Button>
</View>;
```

**In CSS files:**

```css title="global.css"
/* Direct CSS variables */
.container {
  flex: 1;
  background-color: var(--accent);
  width: 50px;
  height: 50px;
  border-radius: var(--radius);
}
```

## Default Theme

The complete theme definition can be found in [variables.css](./variables.css). This theme automatically switches between light and dark modes through [Uniwind's theming system](https://docs.uniwind.dev/theming/basics), which supports system preferences and programmatic theme switching.

## Customizing Colors

**Override existing colors:**

```css
@layer theme {
  @variant light {
    /* Override default colors */
    --accent: oklch(0.65 0.25 270); /* Custom indigo accent */
    --success: oklch(0.65 0.15 155);
  }

  @variant dark {
    /* Override dark theme colors */
    --accent: oklch(0.65 0.25 270);
    --success: oklch(0.75 0.12 155);
  }
}
```

**Tip:** Convert colors at [oklch.com](https://oklch.com)

**Add your own colors:**

```css
@layer theme {
  @variant light {
    --info: oklch(0.6 0.15 210);
    --info-foreground: oklch(0.98 0 0);
  }

  @variant dark {
    --info: oklch(0.7 0.12 210);
    --info-foreground: oklch(0.15 0 0);
  }
}

@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

Now you can use it:

```tsx
import { View, Text } from 'react-native';

<View className="bg-info p-4 rounded-lg">
  <Text className="text-info-foreground">Info message</Text>
</View>;
```

> **Note**: To learn more about theme variables and how they work in Tailwind CSS v4, see the [Tailwind CSS Theme documentation](https://tailwindcss.com/docs/theme).

## useThemeColor Hook Hook

The `useThemeColor` hook has been enhanced to support multiple colors selection, making it more flexible for complex theming scenarios.

**Multiple Colors Selection:**

You can now select multiple colors at once, which is useful when you need to work with related color values together:

```tsx
import { useThemeColor } from 'heroui-native';

// Select multiple colors at once
const [accent, accentForeground, success, danger] = useThemeColor([
  'accent',
  'accentForeground',
  'success',
  'danger',
]);

// Use the selected colors
<View style={{ backgroundColor: accent }}>
  <Text style={{ color: accentForeground }}>Accent Text</Text>
</View>;
```

This enhancement improves performance when working with multiple color values and makes it easier to manage complex theming scenarios where multiple colors need to be selected and applied together.

## Quick Tips

- Always use color variables, not hard-coded values
- Use foreground/background pairs for good contrast
- Test in both light and dark modes
- The system respects user's theme preference automatically
