# HeroUINativeProvider

The `HeroUINativeProvider` is the root provider component that configures and initializes HeroUI Native in your React Native application. It combines theme management, global text configuration, and future extensibility into a single, unified provider.

## Overview

The provider serves as the main entry point for HeroUI Native, wrapping your application with essential contexts and configurations:

- **Theme Management**: Handles light/dark mode switching and custom theme configuration
- **Text Configuration**: Global text component settings for consistency
- **Color System**: Semantic color tokens with runtime access
  ```tsx
  // Use semantic colors in your styles
  const { colors } = useTheme();
  <Text style={{ color: colors.accent }}>Branded text</Text>
  <View style={{ backgroundColor: colors.surface }}>Surface</View>
  ```
- **NativeWind Integration**: CSS variables for Tailwind classes
  ```tsx
  // Theme colors automatically work with Tailwind classes
  <Text className="text-accent">Branded text</Text>
  <View className="bg-surface border-border">Themed surface</View>
  ```

## Installation & Setup

### Basic Setup

Wrap your application root with the provider:

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>;
}
```

### With Configuration

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return (
    <HeroUINativeProvider
      config={{
        colorScheme: 'system',
        textProps: {
          maxFontSizeMultiplier: 1.5,
        },
      }}
    >
      {/* Your app content */}
    </HeroUINativeProvider>
  );
}
```

## Configuration Options

The provider accepts a `config` prop with the following options:

### Color Scheme

Controls the initial theme mode:

```tsx
config={{
  colorScheme: 'light' | 'dark' | 'system'
}}
```

- `'light'`: Force light theme
- `'dark'`: Force dark theme
- `'system'`: Follow device theme preference (default)

### Theme Customization

Override default theme colors and values:

```tsx
config={{
  theme: {
    light: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        accent: '#007AFF',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        // ... other color overrides
      },
      borderRadius: {
        DEFAULT: '16px',
        panel: '12px',
        'panel-inner': '6px',
      },
      opacity: {
        disabled: 0.4,
      },
    },
    dark: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        accent: '#0A84FF',
        // ... other color overrides
      },
      // borderRadius and opacity inherit from light if not specified
    },
  },
}}
```

### Text Component Configuration

Global settings for all Text components within HeroUI Native. These props are carefully selected to include only those that make sense to configure globally across all Text components in the application:

```tsx
config={{
  textProps: {
    // Disable font scaling for accessibility
    allowFontScaling: false,

    // Auto-adjust font size to fit container
    adjustsFontSizeToFit: false,

    // Maximum font size multiplier when scaling
    maxFontSizeMultiplier: 1.5,

    // Minimum font scale (iOS only, 0.01-1.0)
    minimumFontScale: 0.5,
  },
}}
```

## Architecture

### Provider Hierarchy

The `HeroUINativeProvider` internally composes multiple providers:

```
HeroUINativeProvider
├── ThemeProvider (theme management)
│   └── TextComponentProvider (text configuration)
│       └── Your App
```

### Context Access

Child components can access provider context using hooks:

```tsx
import { useTheme } from 'heroui-native';

function MyComponent() {
  const {
    theme, // 'light' | 'dark'
    isDark, // boolean
    colors, // ColorConstants object
    toggleTheme, // () => void
    setTheme, // (theme: 'light' | 'dark') => void
  } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.foreground }}>Current theme: {theme}</Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
}
```

## Complete Example

Here's a comprehensive example showing all configuration options:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';

const config: HeroUINativeConfig = {
  // Theme mode configuration
  colorScheme: 'system',

  // Custom theme configuration
  theme: {
    light: {
      colors: {
        // Base colors
        background: '#ffffff',
        foreground: '#11181C',
        panel: '#f4f4f5',
        muted: '#71717a',
        mutedForeground: '#a1a1aa',

        // Interactive colors
        surface: '#ffffff',
        surfaceForeground: '#11181C',
        default: '#f4f4f5',
        defaultForeground: '#11181C',

        // Brand colors
        accent: 'hsl(220 90% 50%)',
        accentForeground: '#ffffff',
        accentSoft: 'hsl(220 60% 95%)',
        accentSoftForeground: 'hsl(220 90% 50%)',

        // Status colors
        success: '#00C853',
        successForeground: '#ffffff',
        warning: '#FFB300',
        warningForeground: '#000000',
        danger: '#FF3B30',
        dangerForeground: '#ffffff',

        // Surface levels
        surface1: '#fafafa',
        surface2: '#f5f5f5',
        surface3: '#eeeeee',

        // Utility colors
        border: '#e4e4e7',
        divider: '#e4e4e7',
        link: 'hsl(220 90% 50%)',
      },
      borderRadius: {
        'DEFAULT': '12px',
        'panel': '8px',
        'panel-inner': '4px',
      },
      opacity: {
        disabled: 0.5,
      },
    },
    dark: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        panel: '#18181b',
        muted: '#52525b',
        mutedForeground: '#a1a1aa',

        surface: '#18181b',
        surfaceForeground: '#fafafa',
        default: '#27272a',
        defaultForeground: '#fafafa',

        accent: 'hsl(220 90% 60%)',
        accentForeground: '#09090b',
        accentSoft: 'hsl(220 60% 15%)',
        accentSoftForeground: 'hsl(220 90% 60%)',

        success: '#00E676',
        successForeground: '#000000',
        warning: '#FFCA28',
        warningForeground: '#000000',
        danger: '#FF5252',
        dangerForeground: '#000000',

        surface1: '#18181b',
        surface2: '#27272a',
        surface3: '#3f3f46',

        border: '#27272a',
        divider: '#27272a',
        link: 'hsl(220 90% 60%)',
      },
    },
  },

  // Global text configuration
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
  },
};

export default function App() {
  return (
    <HeroUINativeProvider config={config}>
      <YourApp />
    </HeroUINativeProvider>
  );
}
```

## Integration with Expo Router

When using Expo Router, wrap your root layout:

```tsx
// app/_layout.tsx
import { HeroUINativeProvider } from 'heroui-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <HeroUINativeProvider
      config={{
        colorScheme: 'system',
        textProps: {
          minimumFontScale: 0.5,
          maxFontSizeMultiplier: 1.5,
        },
      }}
    >
      <Stack />
    </HeroUINativeProvider>
  );
}
```

## Best Practices

### 1. Single Provider Instance

Always use a single `HeroUINativeProvider` at the root of your app. Don't nest multiple providers:

```tsx
// ❌ Bad
<HeroUINativeProvider>
  <SomeComponent>
    <HeroUINativeProvider> {/* Don't do this */}
      <AnotherComponent />
    </HeroUINativeProvider>
  </SomeComponent>
</HeroUINativeProvider>

// ✅ Good
<HeroUINativeProvider>
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
</HeroUINativeProvider>
```

### 2. Theme Configuration

Define your theme configuration outside the component to prevent recreating on each render:

```tsx
// ❌ Bad
function App() {
  return (
    <HeroUINativeProvider
      config={{
        theme: {
          /* inline config */
        },
      }}
    >
      {/* ... */}
    </HeroUINativeProvider>
  );
}

// ✅ Good
const themeConfig = {
  theme: {
    /* ... */
  },
};

function App() {
  return (
    <HeroUINativeProvider config={themeConfig}>
      {/* ... */}
    </HeroUINativeProvider>
  );
}
```

### 3. Color Format Consistency

While the provider accepts multiple color formats (hex, rgb, hsl), stick to one format for consistency:

```tsx
// ✅ Good - Consistent HSL format
colors: {
  accent: 'hsl(220 90% 50%)',
  success: 'hsl(140 60% 50%)',
  warning: 'hsl(45 100% 50%)',
}

// ❌ Mixed formats (works but not recommended)
colors: {
  accent: '#007AFF',
  success: 'rgb(52, 199, 89)',
  warning: 'hsl(45 100% 50%)',
}
```

### 4. Text Configuration

Consider accessibility when configuring text props:

```tsx
config={{
  textProps: {
    // Allow font scaling for accessibility
    allowFontScaling: true,
    // But limit maximum scale
    maxFontSizeMultiplier: 1.5,
  },
}}
```

## TypeScript Support

The provider is fully typed. Import types for better IDE support:

```tsx
import {
  HeroUINativeProvider,
  type HeroUINativeConfig,
  type ColorConstants,
  type ThemeConfig,
} from 'heroui-native';

const config: HeroUINativeConfig = {
  // Full type safety and autocomplete
  colorScheme: 'system',
  theme: {
    light: {
      colors: {
        // TypeScript knows all valid color keys
        accent: '#007AFF',
      },
    },
  },
};
```

## Troubleshooting

### Theme Not Applying

Ensure the provider is at the root of your app and that NativeWind is properly configured:

```tsx
// Check tailwind.config.js includes HeroUI plugin
plugins: [heroUINativePlugin];

// Ensure content paths include HeroUI components
content: ['./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}'];
```

### Colors Not Updating

When changing theme colors dynamically, ensure you're creating new configuration objects:

```tsx
// ❌ Bad - Mutating existing config
config.theme.light.colors.accent = '#FF0000';

// ✅ Good - Creating new config
setConfig({
  ...config,
  theme: {
    ...config.theme,
    light: {
      ...config.theme.light,
      colors: {
        ...config.theme.light.colors,
        accent: '#FF0000',
      },
    },
  },
});
```

### Type Errors

Ensure you're using the correct import paths:

```tsx
// ✅ Correct imports
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';

// ❌ Incorrect (internal path)
import { HeroUINativeProvider } from 'heroui-native/providers';
```

## See Also

- [Theming Documentation](../theme/theme.md) - Detailed theme documentation
- [Custom Fonts Guide](../theme/theme.md#custom-fonts) - Setting up custom fonts
- [Component Documentation](../../components/README.md) - Using HeroUI Native components
