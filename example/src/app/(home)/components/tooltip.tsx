import { colorKit, Tooltip, useThemeColor } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BellIcon } from '../../../components/icons/bell';
import { FloppyDiscIcon } from '../../../components/icons/floppy-disc';
import { GlobeIcon } from '../../../components/icons/globe';
import { MagicWandIcon } from '../../../components/icons/magic-wand';
import { PencilIcon } from '../../../components/icons/pencil';
import { TrashIcon } from '../../../components/icons/trash';

// ------------------------------------------------------------------------------

const BasicContent = () => {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <Tooltip>
        <Tooltip.Trigger>
          <View className="px-5 py-3 rounded-xl bg-default items-center justify-center">
            <AppText className="text-sm font-medium text-foreground">
              Press me
            </AppText>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content placement="top">
            <Tooltip.Arrow />
            <Tooltip.Text>This is a tooltip</Tooltip.Text>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementContent = () => {
  return (
    <View className="flex-1 items-center justify-center gap-5">
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement}>
          <Tooltip.Trigger>
            <View className="w-28 py-2.5 rounded-xl bg-default items-center">
              <AppText
                className="text-sm font-medium text-foreground"
                maxFontSizeMultiplier={1}
              >
                {placement.charAt(0).toUpperCase() + placement.slice(1)}
              </AppText>
            </View>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content placement={placement}>
              <Tooltip.Arrow />
              <Tooltip.Text>Appears on the {placement}</Tooltip.Text>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      ))}
    </View>
  );
};

// ------------------------------------------------------------------------------

const PressModeContent = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const actions = [
    { id: 'save', Icon: FloppyDiscIcon, tip: 'Save changes' },
    { id: 'edit', Icon: PencilIcon, tip: 'Edit item' },
    { id: 'delete', Icon: TrashIcon, tip: 'Delete item' },
  ] as const;

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <View className="flex-row gap-4">
        {actions.map(({ id, Icon, tip }) => (
          <Tooltip
            key={id}
            mode="press"
            isOpen={openId === id}
            onOpenChange={(open) => setOpenId(open ? id : null)}
          >
            <Tooltip.Trigger>
              <View className="size-12 items-center justify-center rounded-full bg-default">
                <Icon size={20} colorClassName="accent-foreground" />
              </View>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content placement="top">
                <Tooltip.Arrow />
                <Tooltip.Text>{tip}</Tooltip.Text>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip>
        ))}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithArrowContent = () => {
  const accent = useThemeColor('accent');
  const fill = colorKit.setAlpha(accent, 0.15).hex();
  const stroke = colorKit.setAlpha(accent, 0.5).hex();

  const items = [
    { id: 'notifications', Icon: BellIcon, tip: 'Notifications' },
    { id: 'globe', Icon: GlobeIcon, tip: 'Browse web' },
    { id: 'magic', Icon: MagicWandIcon, tip: 'AI suggestions' },
  ] as const;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-8">
        {items.map(({ id, Icon, tip }) => (
          <Tooltip key={id}>
            <Tooltip.Trigger>
              <View className="size-12 items-center justify-center rounded-2xl bg-accent/10">
                <Icon size={22} colorClassName="accent-accent" />
              </View>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                placement="top"
                className="border border-accent/50 bg-accent/15"
              >
                <Tooltip.Arrow fill={fill} stroke={stroke} />
                <Tooltip.Text className="text-accent font-medium">
                  {tip}
                </Tooltip.Text>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip>
        ))}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Tooltip>
        <Tooltip.Trigger>
          <View className="px-5 py-3 rounded-xl bg-default items-center justify-center">
            <AppText className="text-sm font-medium text-foreground">
              Active trigger
            </AppText>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content placement="top">
            <Tooltip.Arrow />
            <Tooltip.Text>Press to see this</Tooltip.Text>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger isDisabled>
          <View className="px-5 py-3 rounded-xl bg-default/50 items-center justify-center opacity-40">
            <AppText className="text-sm font-medium text-foreground">
              Disabled trigger
            </AppText>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content placement="top">
            <Tooltip.Arrow />
            <Tooltip.Text>You will never see this</Tooltip.Text>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOOLTIP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicContent />,
  },
  {
    value: 'placement',
    label: 'Placement',
    content: <PlacementContent />,
  },
  {
    value: 'press-mode',
    label: 'Press mode',
    content: <PressModeContent />,
  },
  {
    value: 'with-arrow',
    label: 'Custom arrow',
    content: <WithArrowContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
];

export default function TooltipScreen() {
  return <UsageVariantFlatList data={TOOLTIP_VARIANTS} />;
}
