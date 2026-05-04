import { Text } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const TypesContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text type="h1">Heading 1</Text>
      <Text type="h2">Heading 2</Text>
      <Text type="h3">Heading 3</Text>
      <Text type="h4">Heading 4</Text>
      <Text type="h5">Heading 5</Text>
      <Text type="h6">Heading 6</Text>
      <Text type="body">Body text</Text>
      <Text type="body-sm">Small body text</Text>
      <Text type="body-xs">Extra-small body text</Text>
      <Text type="code">const x = 42;</Text>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HeadingsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text.Heading type="h1">Page Title</Text.Heading>
      <Text.Heading type="h2">Section Title</Text.Heading>
      <Text.Heading type="h3">Subsection</Text.Heading>
      <Text.Heading type="h4">Group Title</Text.Heading>
      <Text.Heading type="h5">Label Heading</Text.Heading>
      <Text.Heading type="h6">Small Heading</Text.Heading>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ParagraphsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text.Paragraph>
        This is a default body paragraph. It uses the base font size and normal
        weight for comfortable reading.
      </Text.Paragraph>
      <Text.Paragraph type="body-sm">
        This is a smaller paragraph, useful for captions, footnotes, or
        secondary descriptions.
      </Text.Paragraph>
      <Text.Paragraph type="body-xs">
        Extra-small text for disclaimers or fine print.
      </Text.Paragraph>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CodeContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text.Code>npm install heroui-native</Text.Code>
      <Text.Code>{'const greeting = "Hello, world!";'}</Text.Code>
      <Text.Code>{'export default function App() { }'}</Text.Code>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ProseContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text.Prose>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text.Prose>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylingContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Text type="h1" className="text-accent">
        Accent Heading
      </Text>
      <Text type="body" className="text-muted">
        Muted body text
      </Text>
      <Text type="body-sm" className="text-danger">
        Danger small text
      </Text>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TEXT_VARIANTS: UsageVariant[] = [
  {
    value: 'types',
    label: 'Types',
    content: <TypesContent />,
  },
  {
    value: 'headings',
    label: 'Headings',
    content: <HeadingsContent />,
  },
  {
    value: 'paragraphs',
    label: 'Paragraphs',
    content: <ParagraphsContent />,
  },
  {
    value: 'code',
    label: 'Code',
    content: <CodeContent />,
  },
  {
    value: 'prose',
    label: 'Prose',
    content: <ProseContent />,
  },
  {
    value: 'custom',
    label: 'Custom Styling',
    content: <CustomStylingContent />,
  },
];

export default function TextScreen() {
  return <UsageVariantFlatList data={TEXT_VARIANTS} />;
}
