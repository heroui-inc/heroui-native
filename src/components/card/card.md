# Card

Displays a card container with flexible layout sections for structured content.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Card } from 'heroui-native';
```

## Usage

### Basic Usage

The Card component creates a container with built-in sections for organized content.

```tsx
<Card>
  <Card.Details>
    <Card.Body>...</Card.Body>
  </Card.Details>
</Card>
```

### With Title and Description

Combine title and description components for structured text content.

```tsx
<Card>
  <Card.Details>
    <Card.Body>
      <Card.Title>...</Card.Title>
      <Card.Description>...</Card.Description>
    </Card.Body>
  </Card.Details>
</Card>
```

### With Header and Footer

Add header and footer sections for icons, badges, or actions.

```tsx
<Card>
  <Card.Details>
    <Card.Header>...</Card.Header>
    <Card.Body>...</Card.Body>
    <Card.Footer>...</Card.Footer>
  </Card.Details>
</Card>
```

### Surface Variants

Control the card's background appearance using different surface variants.

```tsx
<Card surfaceVariant="none">...</Card>
<Card surfaceVariant="1">...</Card>
<Card surfaceVariant="2">...</Card>
<Card surfaceVariant="3">...</Card>
```

### Horizontal Layout

Create horizontal cards by using flex-row styling.

```tsx
<Card className="flex-row">
  ...
  <Card.Details>
    <Card.Body>...</Card.Body>
  </Card.Details>
</Card>
```

### Background Image

Use an image as an absolute positioned background.

```tsx
<Card>
  <Image source={...} className="absolute inset-0" />
  <Card.Details>...</Card.Details>
</Card>
```

## Example

```tsx
import { Button, Card } from 'heroui-native';
import { ShoppingBasket } from 'lucide-react-native';
import { View } from 'react-native';

export default function CardExample() {
  return (
    <Card>
      <Card.Details>
        <Card.Body className="mb-4">
          <View className="gap-1 mb-2">
            <Card.Title className="text-pink-500">$450</Card.Title>
            <Card.Title>Living room Sofa • Collection 2025</Card.Title>
          </View>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
        </Card.Body>
        <Card.Footer className="gap-3">
          <Button variant="primary">Buy now</Button>
          <Button variant="ghost">
            <Button.Label>Add to cart</Button.Label>
            <Button.EndContent>
              <ShoppingBasket size={16} />
            </Button.EndContent>
          </Button>
        </Card.Footer>
      </Card.Details>
    </Card>
  );
}
```

## Anatomy

```tsx
<Card>
  <Card.Details>
    <Card.Header>...</Card.Header>
    <Card.Body>
      <Card.Title>...</Card.Title>
      <Card.Description>...</Card.Description>
    </Card.Body>
    <Card.Footer>...</Card.Footer>
  </Card.Details>
</Card>
```

- **Card**: Main container that extends Surface component. Provides base card structure with configurable surface variants and handles overall layout.
- **Card.Details**: Content wrapper that applies gap-3 spacing between children. Use when you need proper layout for vertical cards with images.
- **Card.Header**: Header section for top-aligned content like icons or badges.
- **Card.Body**: Main content area with flex-1 that expands to fill all available space between Card.Header and Card.Footer.
- **Card.Title**: Title text with foreground color and medium font weight.
- **Card.Description**: Description text with muted color and smaller font size.
- **Card.Footer**: Footer section for bottom-aligned actions like buttons.

## API Reference

### Card

| prop             | type                          | default | description                                        |
| ---------------- | ----------------------------- | ------- | -------------------------------------------------- |
| `children`       | `React.ReactNode`             | -       | Content to be rendered inside the card             |
| `surfaceVariant` | `'none' \| '1' \| '2' \| '3'` | `'1'`   | Visual variant of the card surface                 |
| `className`      | `string`                      | -       | Additional CSS classes to apply                    |
| `...ViewProps`   | `ViewProps`                   | -       | All standard React Native View props are supported |

### Card.Details

| prop           | type              | default | description                                                   |
| -------------- | ----------------- | ------- | ------------------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the details container |
| `className`    | `string`          | -       | Additional CSS classes                                        |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported            |

### Card.Header

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the header |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Body

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the body   |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Footer

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the footer |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered as the title text |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Card.Description

| prop           | type              | default | description                                              |
| -------------- | ----------------- | ------- | -------------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered as the description text |
| `className`    | `string`          | -       | Additional CSS classes                                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported       |
