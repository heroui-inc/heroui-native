import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import {
  Chip,
  ControlField,
  ListGroup,
  PressableFeedback,
  Separator,
  useThemeColor,
} from 'heroui-native';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BellIcon } from '../../../components/icons/bell';
import { CreditCardIcon } from '../../../components/icons/credit-card';
import { GlobeIcon } from '../../../components/icons/globe';
import { MoonIcon } from '../../../components/icons/moon';
import { PaletteIcon } from '../../../components/icons/palette';
import { PersonIcon } from '../../../components/icons/person';

const BasicContent = () => {
  const { t } = useLingui();
  const mutedColor = useThemeColor('muted');

  return (
    <View className="flex-1 justify-center px-5">
      <AppText className="text-sm text-muted mb-2 ms-2">{t`Account`}</AppText>
      <ListGroup className="mb-6">
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <PersonIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle maxFontSizeMultiplier={1.4}>
              {t`Personal Info`}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription maxFontSizeMultiplier={1.4}>
              {t`Name, email, phone number`}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className="mx-4" />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <CreditCardIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle maxFontSizeMultiplier={1.4}>
              {t`Payment Methods`}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription maxFontSizeMultiplier={1.4}>
              {t`Visa ending in 4829`}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
      </ListGroup>
      <AppText className="text-sm text-muted mb-2 ms-2">
        {t`Preferences`}
      </AppText>
      <ListGroup>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <PaletteIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle maxFontSizeMultiplier={1.4}>
              {t`Appearance`}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription maxFontSizeMultiplier={1.4}>
              {t`Theme, font size, display`}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className="mx-4" />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <BellIcon size={20} colorClassName="accent-foreground" />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle maxFontSizeMultiplier={1.4}>
              {t`Notifications`}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription maxFontSizeMultiplier={1.4}>
              {t`Alerts, sounds, badges`}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix iconProps={{ size: 18, color: mutedColor }} />
        </ListGroup.Item>
      </ListGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

interface PressableListGroupItemProps {
  /** Primary text label */
  title: string;
  /** Secondary descriptive text */
  description?: string;
  /** Called when the item is pressed */
  onPress?: () => void;
  /** Custom trailing content; defaults to a chevron icon when omitted */
  suffix?: ReactNode;
  /** Custom leading content rendered before the title/description */
  prefix?: ReactNode;
}

/**
 * Reusable list-group row wrapped in PressableFeedback with scale + ripple.
 * Combines PressableFeedback (animation disabled on root), PressableFeedback.Scale,
 * ListGroup.Item, and PressableFeedback.Ripple into a single composable unit.
 */
const PressableListGroupItem = ({
  title,
  description,
  onPress,
  suffix,
  prefix,
}: PressableListGroupItemProps) => {
  return (
    <PressableFeedback animation={false} onPress={onPress}>
      <PressableFeedback.Scale>
        <ListGroup.Item>
          {prefix !== undefined && (
            <ListGroup.ItemPrefix>{prefix}</ListGroup.ItemPrefix>
          )}
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
            {description !== undefined && (
              <ListGroup.ItemDescription>
                {description}
              </ListGroup.ItemDescription>
            )}
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>{suffix}</ListGroup.ItemSuffix>
        </ListGroup.Item>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
};

const WithPressableFeedbackContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <ListGroup>
        <PressableListGroupItem
          title={t`Appearance`}
          description={t`Theme, font size, display`}
          onPress={() => console.log('Appearance')}
        />
        <Separator className="mx-4" />
        <PressableListGroupItem
          title={t`Notifications`}
          description={t`Alerts, sounds, badges`}
          onPress={() => console.log('Notifications')}
        />
        <Separator className="mx-4" />
        <PressableListGroupItem
          title={t`Privacy & Security`}
          description={t`Two-factor auth, app lock`}
          onPress={() => console.log('Privacy & Security')}
        />
      </ListGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithCustomSuffixContent = () => {
  const { t } = useLingui();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <ListGroup>
          <ControlField
            isSelected={isDarkMode}
            onSelectedChange={setIsDarkMode}
            className="flex-row items-center gap-3 py-4 px-4"
          >
            <MoonIcon size={18} colorClassName="accent-foreground" />
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>{t`Dark mode`}</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ControlField.Indicator />
          </ControlField>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <GlobeIcon size={18} colorClassName="accent-foreground" />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>{t`Language`}</ListGroup.ItemTitle>
              <ListGroup.ItemDescription>
                {t`English`}
              </ListGroup.ItemDescription>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix>
              <AppText className="text-sm text-muted">{t`Select`}</AppText>
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
          <Separator className="mx-4" />
          <ListGroup.Item>
            <ListGroup.ItemPrefix>
              <BellIcon size={18} colorClassName="accent-foreground" />
            </ListGroup.ItemPrefix>
            <ListGroup.ItemContent>
              <ListGroup.ItemTitle>{t`Notifications`}</ListGroup.ItemTitle>
            </ListGroup.ItemContent>
            <ListGroup.ItemSuffix>
              <Chip variant="primary" color="danger">
                <Chip.Label className="font-bold">7</Chip.Label>
              </Chip>
            </ListGroup.ItemSuffix>
          </ListGroup.Item>
        </ListGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LIST_GROUP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: msg`Basic`,
    content: <BasicContent />,
  },
  {
    value: 'with-pressable-feedback',
    label: msg`With pressable feedback`,
    content: <WithPressableFeedbackContent />,
  },
  {
    value: 'custom-suffix',
    label: msg`Custom suffix`,
    content: <WithCustomSuffixContent />,
  },
];

export default function ListGroupScreen() {
  return <UsageVariantFlatList data={LIST_GROUP_VARIANTS} />;
}
