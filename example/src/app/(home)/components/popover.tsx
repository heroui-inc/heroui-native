import { Ionicons } from '@expo/vector-icons';
import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useRouter } from 'expo-router';
import { Button, colorKit, Popover, useThemeColor } from 'heroui-native';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { ArrowDownToSquareIcon } from '../../../components/icons/arrow-down-to-square';
import { CodeCompareIcon } from '../../../components/icons/code-compare';
import { CopyIcon } from '../../../components/icons/copy';
import { MapPinIcon } from '../../../components/icons/map-pin';
import { NodesRightIcon } from '../../../components/icons/nodes-right';
import { useAppLocale } from '../../../contexts/app-locale-context';

const StyledIonicons = withUniwind(Ionicons);

const WithTitleDescriptionContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary">{t`Did you know?`}</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            presentation="popover"
            width={320}
            placement="top"
            className="gap-3 px-6 py-5"
          >
            <Popover.Close
              variant="ghost"
              className="absolute top-3 inset-e-2 z-50"
            />
            <View className="flex-row items-center gap-3 mb-1">
              <View className="size-12 items-center justify-center rounded-full bg-warning/15">
                <StyledIonicons
                  name="rocket"
                  size={26}
                  className="text-warning"
                />
              </View>
              <View className="flex-1">
                <Popover.Title>{t`Fun Fact!`}</Popover.Title>
              </View>
            </View>
            <Popover.Description
              maxFontSizeMultiplier={1.6}
              className="text-sm"
            >
              {t`The first computer bug was an actual moth found trapped in a Harvard Mark II computer in 1947. Grace Hopper taped it to the log book with the note "First actual case of bug being found."`}
            </Popover.Description>
            <View className="flex-row items-center gap-2 mt-2 pt-2">
              <StyledIonicons
                name="sparkles"
                size={14}
                className="text-accent"
              />
              <AppText className="text-xs text-muted">{t`Tech History`}</AppText>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PresentationVariantsContent = () => {
  const { t } = useLingui();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <View className="flex-1 px-5 items-center justify-center gap-8">
      <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger asChild>
          <Button variant="secondary">{t`Quick Notification`}</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            presentation="popover"
            width={300}
            className="gap-3"
            placement="top"
          >
            <View className="items-start gap-2">
              <View className="flex-row items-center gap-3 self-stretch">
                <View className="size-10 items-center justify-center rounded-full bg-success/15">
                  <StyledIonicons
                    name="checkmark-circle"
                    size={24}
                    className="text-success"
                  />
                </View>
                <View className="flex-1">
                  <Popover.Title>{t`Payment Successful`}</Popover.Title>
                  <AppText className="text-xs text-muted text-left">
                    {t`2 minutes ago`}
                  </AppText>
                </View>
              </View>
              <Popover.Description>
                {t`Your payment of $49.99 has been processed successfully. Receipt sent to your email.`}
              </Popover.Description>
            </View>
            <Button variant="secondary" onPress={() => setPopoverOpen(false)}>
              {t`Dismiss`}
            </Button>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <Popover
        presentation="bottom-sheet"
        isOpen={isBottomSheetOpen}
        onOpenChange={setBottomSheetOpen}
      >
        <Popover.Trigger asChild>
          <Button variant="secondary">{t`More Options`}</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay className="bg-black/15" />
          <Popover.Content presentation="bottom-sheet">
            <View className="gap-4">
              <View className="mb-2">
                <Popover.Title className="text-center text-foreground">
                  {t`Share Options`}
                </Popover.Title>
                <Popover.Description className="text-center text-muted">
                  {t`Choose how you'd like to share this content`}
                </Popover.Description>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-accent/10">
                    <NodesRightIcon size={18} colorClassName="accent-accent" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      {t`Share Link`}
                    </AppText>
                    <AppText className="text-xs text-muted">
                      {t`Send via messaging app`}
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-warning/10">
                    <CopyIcon size={20} colorClassName="accent-warning" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      {t`Copy Link`}
                    </AppText>
                    <AppText className="text-xs text-muted">
                      {t`Copy to clipboard`}
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 p-3 rounded-lg">
                  <View className="size-10 items-center justify-center rounded-full bg-success/10">
                    <ArrowDownToSquareIcon
                      size={20}
                      colorClassName="accent-success"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-medium text-foreground">
                      {t`Save Offline`}
                    </AppText>
                    <AppText className="text-xs text-muted">
                      {t`Download for later`}
                    </AppText>
                  </View>
                </View>
              </View>
              <Button
                variant="secondary"
                size="lg"
                className="self-stretch mt-2"
                onPress={() => setBottomSheetOpen(false)}
              >
                {t`Cancel`}
              </Button>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

// ------------------------------------------------------------------------------

/** Physical side a demo popover opens on. */
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Trigger labels for each placement.
 *
 * These are looked up rather than derived by capitalising the `placement` prop,
 * because Lingui extracts messages statically and cannot see a string built at
 * runtime.
 */
const PLACEMENT_LABELS: Record<PopoverPlacement, MessageDescriptor> = {
  top: msg`Top`,
  bottom: msg`Bottom`,
  left: msg`Left`,
  right: msg`Right`,
};

const PlacementPopover = ({ placement }: { placement: PopoverPlacement }) => {
  const { t } = useLingui();
  const label = t(PLACEMENT_LABELS[placement]);

  const themeColorBorder = useThemeColor('accent');
  const arrowStroke = colorKit.setAlpha(themeColorBorder, 0.35).hex();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          <Button.Label maxFontSizeMultiplier={1}>{label}</Button.Label>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content
          presentation="popover"
          placement={placement}
          width={220}
          className="gap-2 border border-accent/35"
        >
          <Popover.Arrow stroke={arrowStroke} />
          <View className="flex-row items-center gap-2">
            <View className="size-8 items-center justify-center rounded-full bg-accent/15">
              <MapPinIcon size={16} colorClassName="accent-accent" />
            </View>
            <AppText className="text-sm font-semibold text-foreground">
              {t`Quick Tip`}
            </AppText>
          </View>
          <AppText className="text-xs text-muted leading-4">
            {t`This popover appears on the ${placement} side of the trigger button`}
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const PlacementOptionsContent = () => {
  const { isRTL } = useAppLocale();

  // The grid intentionally pairs the "left"-placement trigger with the trailing
  // edge (and "right" with the leading edge) so each popover has room to open on
  // its physical side. Because the rows are `flex-row`, RTL mirrors that column
  // order, so we swap the left/right triggers to keep them collision-free.
  const leadingSidePlacement = isRTL ? 'left' : 'right';
  const trailingSidePlacement = isRTL ? 'right' : 'left';

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="w-full gap-4">
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement="top" />
          <PlacementPopover placement={trailingSidePlacement} />
        </View>
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement={leadingSidePlacement} />
          <PlacementPopover placement="bottom" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

/** Edge a demo popover aligns to along the trigger's cross axis. */
type PopoverAlign = 'start' | 'center' | 'end';

/**
 * Trigger labels for each alignment.
 *
 * Looked up for the same reason as {@link PLACEMENT_LABELS}: Lingui cannot
 * extract a label assembled at runtime.
 */
const ALIGN_LABELS: Record<PopoverAlign, MessageDescriptor> = {
  start: msg`Start`,
  center: msg`Center`,
  end: msg`End`,
};

const AlignmentPopover = ({ align }: { align: PopoverAlign }) => {
  const { t } = useLingui();
  const label = t(ALIGN_LABELS[align]);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          <Button.Label maxFontSizeMultiplier={1}>{label}</Button.Label>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content
          presentation="popover"
          placement="top"
          align={align}
          width={200}
          className="gap-2"
        >
          <View className="flex-row items-center gap-2">
            <View className="size-8 items-center justify-center rounded-full bg-warning/15">
              <CodeCompareIcon size={16} colorClassName="accent-warning" />
            </View>
            <AppText
              className="flex-1 text-sm font-semibold text-foreground"
              numberOfLines={1}
            >
              {t`Alignment`}
            </AppText>
          </View>
          <AppText className="text-xs text-muted">
            {t`Aligned to the ${align} of the trigger`}
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const AlignmentOptionsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row gap-4">
        <AlignmentPopover align="start" />
        <AlignmentPopover align="center" />
        <AlignmentPopover align="end" />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalTestContent = () => {
  const { t } = useLingui();
  const router = useRouter();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Button
        variant="secondary"
        onPress={() => router.push('components/popover-native-modal')}
      >
        <Button.Label maxFontSizeMultiplier={1.6}>
          {t`Popover from native modal`}
        </Button.Label>
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const POPOVER_VARIANTS: UsageVariant[] = [
  {
    value: 'with-title-description',
    label: msg`With title & description`,
    content: <WithTitleDescriptionContent />,
  },
  {
    value: 'presentation-variants',
    label: msg`Presentation variants`,
    content: <PresentationVariantsContent />,
  },
  {
    value: 'placement-options',
    label: msg`Placement options`,
    content: <PlacementOptionsContent />,
  },
  {
    value: 'alignment-options',
    label: msg`Alignment options`,
    content: <AlignmentOptionsContent />,
  },
];

if (Platform.OS === 'ios') {
  POPOVER_VARIANTS.push({
    value: 'native-modal-test',
    label: msg`Native modal test`,
    content: <NativeModalTestContent />,
  });
}

export default function PopoverScreen() {
  return <UsageVariantFlatList data={POPOVER_VARIANTS} />;
}
