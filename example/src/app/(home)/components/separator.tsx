import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Separator, Surface } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const SeparatorInActionContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface variant="secondary" className="px-6 py-7">
        {/* eslint-disable lingui/no-unlocalized-strings -- Product name. */}
        <AppText
          className="text-base font-medium text-foreground"
          maxFontSizeMultiplier={1.4}
        >
          HeroUI Native
        </AppText>
        {/* eslint-enable lingui/no-unlocalized-strings */}
        <AppText className="text-sm text-muted" maxFontSizeMultiplier={1.4}>
          {t`A modern React Native component library.`}
        </AppText>
        <Separator className="my-4" />
        <View className="flex-row items-center h-5">
          <AppText
            className="text-sm text-foreground"
            maxFontSizeMultiplier={1.2}
          >
            {t`Components`}
          </AppText>
          <Separator orientation="vertical" className="mx-3" />
          <AppText
            className="text-sm text-foreground"
            maxFontSizeMultiplier={1.2}
          >
            {t`Themes`}
          </AppText>
          <Separator orientation="vertical" className="mx-3" />
          <AppText
            className="text-sm text-foreground"
            maxFontSizeMultiplier={1.2}
          >
            {t`Examples`}
          </AppText>
        </View>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Thin (default)`}
          </AppText>
          <Separator variant="thin" />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">{t`Thick`}</AppText>
          <Separator variant="thick" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const OrientationContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Horizontal (default)`}
          </AppText>
          <Separator />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">{t`Vertical`}</AppText>
          <View className="h-20 w-full flex-row justify-center">
            <Separator orientation="vertical" />
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomThicknessContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Default (hairline width)`}
          </AppText>
          <Separator />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">1px</AppText>
          <Separator thickness={1} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">2px</AppText>
          <Separator thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">5px</AppText>
          <Separator thickness={5} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">10px</AppText>
          <Separator thickness={10} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomColorsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Custom Background Color`}
          </AppText>
          <Separator className="bg-accent" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Success Color`}
          </AppText>
          <Separator className="bg-success" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Warning Color`}
          </AppText>
          <Separator className="bg-warning" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">
            {t`Danger Color`}
          </AppText>
          <Separator className="bg-danger" thickness={2} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SEPARATOR_VARIANTS: UsageVariant[] = [
  {
    value: 'separator-in-action',
    label: msg`Separator in action`,
    content: <SeparatorInActionContent />,
  },
  {
    value: 'variants',
    label: msg`Variants`,
    content: <VariantsContent />,
  },
  {
    value: 'orientation',
    label: msg`Orientation`,
    content: <OrientationContent />,
  },
  {
    value: 'custom-thickness',
    label: msg`Custom thickness`,
    content: <CustomThicknessContent />,
  },
  {
    value: 'custom-colors',
    label: msg`Custom colors`,
    content: <CustomColorsContent />,
  },
];

export default function SeparatorScreen() {
  return <UsageVariantFlatList data={SEPARATOR_VARIANTS} />;
}
