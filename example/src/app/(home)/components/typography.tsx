import { Typography } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const TypesContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography type="h1">Heading 1</Typography>
      <Typography type="h2">Heading 2</Typography>
      <Typography type="h3">Heading 3</Typography>
      <Typography type="h4">Heading 4</Typography>
      <Typography type="h5">Heading 5</Typography>
      <Typography type="h6">Heading 6</Typography>
      <Typography type="body">Body text</Typography>
      <Typography type="body-sm">Small body text</Typography>
      <Typography type="body-xs">Extra-small body text</Typography>
      <Typography type="code">const x = 42;</Typography>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HeadingsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Heading type="h1">Page Title</Typography.Heading>
      <Typography.Heading type="h2">Section Title</Typography.Heading>
      <Typography.Heading type="h3">Subsection</Typography.Heading>
      <Typography.Heading type="h4">Group Title</Typography.Heading>
      <Typography.Heading type="h5">Label Heading</Typography.Heading>
      <Typography.Heading type="h6">Small Heading</Typography.Heading>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ParagraphsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Paragraph>
        This is a default body paragraph. It uses the base font size and normal
        weight for comfortable reading.
      </Typography.Paragraph>
      <Typography.Paragraph type="body-sm">
        This is a smaller paragraph, useful for captions, footnotes, or
        secondary descriptions.
      </Typography.Paragraph>
      <Typography.Paragraph type="body-xs">
        Extra-small text for disclaimers or fine print. lore
      </Typography.Paragraph>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CodeContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Code>npm install heroui-native</Typography.Code>
      <Typography.Code>{'const greeting = "Hello, world!";'}</Typography.Code>
      <Typography.Code>{'export default function App() { }'}</Typography.Code>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TYPOGRAPHY_VARIANTS: UsageVariant[] = [
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
];

export default function TypographyScreen() {
  return <UsageVariantFlatList data={TYPOGRAPHY_VARIANTS} />;
}
