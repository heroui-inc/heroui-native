import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Typography } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const TypesContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography type="h1">{t`Heading 1`}</Typography>
      <Typography type="h2">{t`Heading 2`}</Typography>
      <Typography type="h3">{t`Heading 3`}</Typography>
      <Typography type="h4">{t`Heading 4`}</Typography>
      <Typography type="h5">{t`Heading 5`}</Typography>
      <Typography type="h6">{t`Heading 6`}</Typography>
      <Typography type="body">{t`Body text`}</Typography>
      <Typography type="body-sm">{t`Small body text`}</Typography>
      <Typography type="body-xs">{t`Extra-small body text`}</Typography>
      {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Source code sample. */}
      <Typography type="code">const x = 42;</Typography>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HeadingsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Heading type="h1">{t`Page Title`}</Typography.Heading>
      <Typography.Heading type="h2">{t`Section Title`}</Typography.Heading>
      <Typography.Heading type="h3">{t`Subsection`}</Typography.Heading>
      <Typography.Heading type="h4">{t`Group Title`}</Typography.Heading>
      <Typography.Heading type="h5">{t`Label Heading`}</Typography.Heading>
      <Typography.Heading type="h6">{t`Small Heading`}</Typography.Heading>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ParagraphsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Paragraph>
        {t`This is a default body paragraph. It uses the base font size and normal weight for comfortable reading.`}
      </Typography.Paragraph>
      <Typography.Paragraph type="body-sm">
        {t`This is a smaller paragraph, useful for captions, footnotes, or secondary descriptions.`}
      </Typography.Paragraph>
      <Typography.Paragraph type="body-xs">
        {t`Extra-small text for disclaimers or fine print. lore`}
      </Typography.Paragraph>
    </View>
  );
};

// ------------------------------------------------------------------------------

/* eslint-disable lingui/no-unlocalized-strings -- Shell and source code samples. */
const CodeContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-4">
      <Typography.Code>npm install heroui-native</Typography.Code>
      <Typography.Code>{'const greeting = "Hello, world!";'}</Typography.Code>
      <Typography.Code>{'export default function App() { }'}</Typography.Code>
    </View>
  );
};
/* eslint-enable lingui/no-unlocalized-strings */

// ------------------------------------------------------------------------------

const TYPOGRAPHY_VARIANTS: UsageVariant[] = [
  {
    value: 'types',
    label: msg`Types`,
    content: <TypesContent />,
  },
  {
    value: 'headings',
    label: msg`Headings`,
    content: <HeadingsContent />,
  },
  {
    value: 'paragraphs',
    label: msg`Paragraphs`,
    content: <ParagraphsContent />,
  },
  {
    value: 'code',
    label: msg`Code`,
    content: <CodeContent />,
  },
];

export default function TypographyScreen() {
  return <UsageVariantFlatList data={TYPOGRAPHY_VARIANTS} />;
}
