import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { LinearGradient } from 'expo-linear-gradient';
import { Chip } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BellFillIcon } from '../../../components/icons/bell-fill';
import { PlusIcon } from '../../../components/icons/plus';
import { StarFillIcon } from '../../../components/icons/star-fill';
import { XMarkIcon } from '../../../components/icons/x-mark';

const SizesContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center gap-4">
          <Chip size="sm">{t`Small`}</Chip>
          <Chip size="md">{t`Medium`}</Chip>
          <Chip size="lg">{t`Large`}</Chip>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center gap-4">
        <Chip variant="primary" className="self-center">
          {t`Primary`}
        </Chip>
        <Chip variant="secondary" className="self-center">
          {t`Secondary`}
        </Chip>
        <Chip variant="tertiary" className="self-center">
          {t`Tertiary`}
        </Chip>
        <Chip variant="soft" className="self-center">
          {t`Soft`}
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PrimaryVariantColorsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="primary" color="accent">
              {t`Accent`}
            </Chip>
            <Chip variant="primary" color="default">
              {t`Default`}
            </Chip>
            <Chip variant="primary" color="success">
              {t`Success`}
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="primary" color="warning">
              {t`Warning`}
            </Chip>
            <Chip variant="primary" color="danger">
              {t`Danger`}
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SecondaryVariantColorsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="secondary" color="accent">
              {t`Accent`}
            </Chip>
            <Chip variant="secondary" color="default">
              {t`Default`}
            </Chip>
            <Chip variant="secondary" color="success">
              {t`Success`}
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="secondary" color="warning">
              {t`Warning`}
            </Chip>
            <Chip variant="secondary" color="danger">
              {t`Danger`}
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TertiaryVariantColorsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="tertiary" color="accent">
              {t`Accent`}
            </Chip>
            <Chip variant="tertiary" color="default">
              {t`Default`}
            </Chip>
            <Chip variant="tertiary" color="success">
              {t`Success`}
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="tertiary" color="warning">
              {t`Warning`}
            </Chip>
            <Chip variant="tertiary" color="danger">
              {t`Danger`}
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SoftVariantColorsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="soft" color="accent">
              {t`Accent`}
            </Chip>
            <Chip variant="soft" color="default">
              {t`Default`}
            </Chip>
            <Chip variant="soft" color="success">
              {t`Success`}
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="soft" color="warning">
              {t`Warning`}
            </Chip>
            <Chip variant="soft" color="danger">
              {t`Danger`}
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithStartContentContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-8">
        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip variant="tertiary">
            <BellFillIcon
              size={11}
              colorClassName="accent-accent-soft-foreground"
            />
            <Chip.Label>{t`Featured`}</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <PlusIcon
              size={12}
              colorClassName="accent-success-soft-foreground"
            />
            <Chip.Label>{t`New`}</Chip.Label>
          </Chip>
          <Chip size="lg" variant="tertiary" color="warning">
            <StarFillIcon
              size={11}
              colorClassName="accent-warning-soft-foreground"
            />
            <Chip.Label>{t`Premium`}</Chip.Label>
          </Chip>
        </View>

        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip size="md" variant="secondary">
            <View className="size-1.5 me-1.5 rounded-full bg-accent" />
            <Chip.Label>{t`Information`}</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <View className="size-1.5 me-1.5 rounded-full bg-success-soft-foreground" />
            <Chip.Label>{t`Completed`}</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="warning">
            <View className="size-1.5 me-1.5 rounded-full bg-warning-soft-foreground" />
            <Chip.Label>{t`Pending`}</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="danger">
            <View className="size-1.5 me-1.5 rounded-full bg-danger-soft-foreground" />
            <Chip.Label>{t`Failed`}</Chip.Label>
          </Chip>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithEndContentContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip size="sm" variant="secondary">
          <Chip.Label className="text-muted">{t`Close`}</Chip.Label>
          <XMarkIcon size={12} colorClassName="accent-muted" />
        </Chip>
        <Chip size="md" variant="primary" color="danger" className="pe-1.5">
          <Chip.Label>{t`Remove`}</Chip.Label>
          <XMarkIcon size={14} colorClassName="accent-danger-foreground" />
        </Chip>
        <Chip
          size="lg"
          variant="secondary"
          color="default"
          className="pe-1.5 p-0.5 ps-2 gap-2"
        >
          <Chip.Label className="text-muted">{t`Clear`}</Chip.Label>
          <View className="rounded-full p-1 bg-muted/20">
            <XMarkIcon size={12} colorClassName="accent-muted" />
          </View>
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylingContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip className="bg-purple-600 px-6">
          <Chip.Label className="text-background text-base">
            {t`Custom`}
          </Chip.Label>
        </Chip>
        <Chip
          variant="secondary"
          className="border-purple-600 bg-purple-100 rounded-sm"
        >
          <Chip.Label className="text-purple-800">{t`Purple`}</Chip.Label>
        </Chip>

        <Chip>
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-semibold">
            {t`Gradient`}
          </Chip.Label>
        </Chip>

        <Chip size="lg">
          <LinearGradient
            colors={['#10b981', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-bold">{t`Premium`}</Chip.Label>
        </Chip>

        <Chip>
          <LinearGradient
            colors={['#f59e0b', '#ef4444']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-semibold">{t`Hot`}</Chip.Label>
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CHIP_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: msg`Sizes`,
    content: <SizesContent />,
  },
  {
    value: 'variants',
    label: msg`Variants`,
    content: <VariantsContent />,
  },
  {
    value: 'primary-variant-colors',
    label: msg`Primary variant colors`,
    content: <PrimaryVariantColorsContent />,
  },
  {
    value: 'secondary-variant-colors',
    label: msg`Secondary variant colors`,
    content: <SecondaryVariantColorsContent />,
  },
  {
    value: 'tertiary-variant-colors',
    label: msg`Tertiary variant colors`,
    content: <TertiaryVariantColorsContent />,
  },
  {
    value: 'soft-variant-colors',
    label: msg`Soft variant colors`,
    content: <SoftVariantColorsContent />,
  },
  {
    value: 'with-start-content',
    label: msg`With start content`,
    content: <WithStartContentContent />,
  },
  {
    value: 'with-end-content',
    label: msg`With end content`,
    content: <WithEndContentContent />,
  },
  {
    value: 'custom-styling',
    label: msg`Custom styling`,
    content: <CustomStylingContent />,
  },
];

export default function ChipScreen() {
  return <UsageVariantFlatList data={CHIP_VARIANTS} />;
}
