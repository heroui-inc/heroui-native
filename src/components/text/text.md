# Text

Primitive typography component for rendering styled text with semantic type variants.

## Import

```tsx
import { Text } from 'heroui-native';
```

## Anatomy

```tsx
<Text>...</Text>

{/* Sub-components */}
<Text.Heading>...</Text.Heading>
<Text.Paragraph>...</Text.Paragraph>
<Text.Code>...</Text.Code>
<Text.Prose>...</Text.Prose>
```

- **Text**: Root text element. The `type` prop selects a semantic typography preset (heading, body, or code).
- **Text.Heading**: Convenience wrapper restricted to heading types (`h1`–`h6`). Adds `accessibilityRole="header"` automatically.
- **Text.Paragraph**: Convenience wrapper restricted to body types (`body`, `body-sm`, `body-xs`).
- **Text.Code**: Renders monospaced text using a platform-appropriate monospace font family.
- **Text.Prose**: Minimal wrapper for longer body text passages. Currently equivalent to `body` type.

## Usage

### Basic Usage

The Text component renders body text by default.

```tsx
<Text>Hello, world!</Text>
```

### Type Variants

Use the `type` prop to select a semantic typography preset.

```tsx
<Text type="h1">Heading 1</Text>
<Text type="h2">Heading 2</Text>
<Text type="h3">Heading 3</Text>
<Text type="h4">Heading 4</Text>
<Text type="h5">Heading 5</Text>
<Text type="h6">Heading 6</Text>
<Text type="body">Body text</Text>
<Text type="body-sm">Small body text</Text>
<Text type="body-xs">Extra-small body text</Text>
<Text type="code">Code snippet</Text>
```

### Headings

Use `Text.Heading` for heading text with automatic header accessibility role.

```tsx
<Text.Heading type="h1">Page Title</Text.Heading>
<Text.Heading type="h2">Section Title</Text.Heading>
<Text.Heading type="h3">Subsection Title</Text.Heading>
```

### Paragraphs

Use `Text.Paragraph` for body text.

```tsx
<Text.Paragraph>
  This is a paragraph of body text with the default size.
</Text.Paragraph>
<Text.Paragraph type="body-sm">
  This is smaller body text.
</Text.Paragraph>
```

### Code

Use `Text.Code` for inline code snippets with monospaced font.

```tsx
<Text.Code>console.log('hello')</Text.Code>
```

### Prose

Use `Text.Prose` for longer passages of body text.

```tsx
<Text.Prose>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua.
</Text.Prose>
```

### Custom Styling

Override or extend styles with the `className` prop.

```tsx
<Text type="h1" className="text-accent">Colored Heading</Text>
<Text type="body" className="text-muted">Muted body text</Text>
```

## Example

```tsx
import { Text } from 'heroui-native';
import { View } from 'react-native';

export default function TextExample() {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text.Heading type="h1">Welcome</Text.Heading>
      <Text.Heading type="h3">Getting Started</Text.Heading>
      <Text.Paragraph>
        This is a body paragraph rendered with the Text component.
      </Text.Paragraph>
      <Text.Paragraph type="body-sm">
        Smaller supporting text for captions or footnotes.
      </Text.Paragraph>
      <Text.Code>npm install heroui-native</Text.Code>
    </View>
  );
}
```

You can find more examples in the [GitHub repository](<https://github.com/heroui-inc/heroui-native/blob/main/example/src/app/(home)/components/text.tsx>).

## API Reference

### Text

Text extends all standard React Native `TextProps` with additional typography props.

| prop           | type                                                                                            | default  | description                                         |
| -------------- | ----------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------- |
| `type`         | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'body-sm' \| 'body-xs' \| 'code'` | `'body'` | Semantic typography variant                         |
| `children`     | `React.ReactNode`                                                                               | -        | Content to render                                   |
| `className`    | `string`                                                                                        | -        | Additional CSS classes                              |
| `...TextProps` | `TextProps`                                                                                     | -        | All standard React Native Text props are supported  |

### Text.Heading

| prop           | type                                                  | default | description                                        |
| -------------- | ----------------------------------------------------- | ------- | -------------------------------------------------- |
| `type`         | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'`      | `'h1'`  | Heading level                                      |
| `children`     | `React.ReactNode`                                     | -       | Content to render                                  |
| `className`    | `string`                                              | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`                                            | -       | All standard React Native Text props are supported |

### Text.Paragraph

| prop           | type                                       | default  | description                                        |
| -------------- | ------------------------------------------ | -------- | -------------------------------------------------- |
| `type`         | `'body' \| 'body-sm' \| 'body-xs'`         | `'body'` | Paragraph text size                                |
| `children`     | `React.ReactNode`                          | -        | Content to render                                  |
| `className`    | `string`                                   | -        | Additional CSS classes                             |
| `...TextProps` | `TextProps`                                | -        | All standard React Native Text props are supported |

### Text.Code

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to render                                  |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Text.Prose

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to render                                  |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |
