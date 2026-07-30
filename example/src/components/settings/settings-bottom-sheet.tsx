import { useLingui } from '@lingui/react/macro';
import {
  BottomSheet,
  Description,
  Label,
  Radio,
  RadioGroup,
  Separator,
} from 'heroui-native';
import { Fragment, type FC } from 'react';
import { View } from 'react-native';
import { useAppLocale } from '../../contexts/app-locale-context';
import {
  APP_LOCALE_LABELS,
  APP_LOCALES,
  isAppLocale,
  isRtlLocale,
} from '../../i18n/locales';

export type SettingsBottomSheetProps = {
  /** Whether the sheet is visible */
  isOpen: boolean;
  /** Called when the sheet requests to open or close */
  onOpenChange: (isOpen: boolean) => void;
};

/**
 * App settings presented in a bottom sheet.
 *
 * Holds the language picker, which is also the layout direction control: each
 * option states the direction it renders in, so selecting Arabic or Hebrew
 * flips the app right-to-left and selecting English restores left-to-right.
 * There is no separate RTL switch, because direction is a property of the
 * language rather than an independent preference.
 *
 * The sheet is fully controlled and has no `BottomSheet.Trigger`, because it is
 * opened from a navigation header button rendered outside this tree.
 */
export const SettingsBottomSheet: FC<SettingsBottomSheetProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { t } = useLingui();
  const { locale, setLocale } = useAppLocale();

  /**
   * Applies a radio selection, narrowing the untyped `string` handed back by
   * `RadioGroup` to a supported locale.
   *
   * @param value - Locale code emitted by the radio group.
   */
  const handleLocaleChange = (value: string): void => {
    if (isAppLocale(value)) {
      setLocale(value);
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="mb-6 gap-1">
            <BottomSheet.Title>{t`Settings`}</BottomSheet.Title>
            <BottomSheet.Description>
              {t`Preview the component library in a different layout direction and language.`}
            </BottomSheet.Description>
          </View>

          <View className="gap-3">
            <Label>{t`Language`}</Label>
            <RadioGroup
              value={locale}
              onValueChange={handleLocaleChange}
              variant="secondary"
              className="gap-0"
            >
              {APP_LOCALES.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 && <Separator className="my-4" />}
                  <RadioGroup.Item value={item}>
                    <View className="flex-1">
                      <Label>{APP_LOCALE_LABELS[item]}</Label>
                      <Description>
                        {isRtlLocale(item)
                          ? t`Right-to-left layout`
                          : t`Left-to-right layout`}
                      </Description>
                    </View>
                    <Radio />
                  </RadioGroup.Item>
                </Fragment>
              ))}
            </RadioGroup>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
