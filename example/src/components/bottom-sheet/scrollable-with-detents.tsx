import Ionicons from '@expo/vector-icons/Ionicons';
import { useLingui } from '@lingui/react/macro';
import {
  BottomSheet,
  Button,
  Card,
  cn,
  Separator,
  type BottomSheetRef,
} from 'heroui-native';
import { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../contexts/app-theme-context';
import { AppText } from '../app-text';

const StyledIonicons = withUniwind(Ionicons);

export const ScrollableWithDetentsContent = () => {
  const { t } = useLingui();
  const { isDark } = useAppTheme();
  const sheetRef = useRef<BottomSheetRef>(null);
  const scrollableRef = useRef<ScrollViewInstance>(null);

  /* eslint-disable lingui/no-unlocalized-strings -- `time` and `price` hold
     pre-formatted sample values. A real app would derive them from
     `Intl.NumberFormat` / `Intl.RelativeTimeFormat` instead of translating. */
  const taxiOptions = [
    {
      id: 'priority',
      name: t`Taxi Priority`,
      icon: 'flash-outline' as const,
      time: '1 min',
      capacity: '4',
      price: 'c. €12-19',
      highlight: false,
    },
    {
      id: 'comfort',
      name: t`Taxi Comfort`,
      icon: 'star-outline' as const,
      time: '6 min',
      capacity: '4',
      price: 'c. €11-18',
      highlight: false,
    },
    {
      id: 'green',
      name: t`Green Taxi`,
      icon: 'leaf-outline' as const,
      time: '6 min',
      capacity: '4',
      price: 'c. €11-17',
      highlight: false,
    },
    {
      id: 'premium',
      name: t`Premium`,
      icon: 'car-sport-outline' as const,
      time: '10 min',
      capacity: '4',
      description: t`High end cars, top drivers`,
      price: '€30.89',
      highlight: true,
    },
    {
      id: 'xl',
      name: t`Taxi XL`,
      icon: 'car-outline' as const,
      time: '2 min',
      capacity: '5-8',
      price: 'c. €12-19',
      highlight: false,
    },
  ];
  /* eslint-enable lingui/no-unlocalized-strings */

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Scrollable with detents`}
          </Button.Label>
        </Button>
        <BottomSheet
          ref={sheetRef}
          detents={[0.4, 0.8]}
          scrollableRef={scrollableRef}
          style={styles.flex}
          contentContainerClassName="h-full px-0"
          footer={
            <View className="px-4 pb-3 bg-overlay">
              <Separator className="mb-3" />
              <Button
                variant="danger"
                onPress={() => sheetRef.current?.dismiss()}
              >
                {t`Order Premium now`}
              </Button>
            </View>
          }
        >
          <View className="flex-row items-center justify-between ps-7 pe-5 pb-3 gap-4">
            <BottomSheet.Title
              className="flex-1 text-xl font-bold"
              maxFontSizeMultiplier={1.2}
              numberOfLines={1}
            >
              {t`Select a way to travel`}
            </BottomSheet.Title>
            <BottomSheet.Close />
          </View>
          <Separator />
          <ScrollView
            ref={scrollableRef}
            className="flex-1"
            contentContainerClassName="pb-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-4 px-3">
              {taxiOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    'flex-row items-center mb-2 shadow-none',
                    !option.highlight
                      ? 'bg-transparent'
                      : isDark
                        ? 'bg-green-900/40'
                        : 'bg-green-50'
                  )}
                >
                  <View
                    className={cn(
                      'size-12 items-center justify-center rounded-full me-3',
                      option.highlight
                        ? 'bg-black'
                        : option.icon === 'leaf-outline'
                          ? 'bg-green-500'
                          : 'bg-black'
                    )}
                  >
                    <StyledIonicons
                      name={option.icon}
                      size={24}
                      className="text-white"
                    />
                  </View>
                  <Card.Body className="flex-1">
                    <Card.Title className="text-base font-semibold">
                      {option.name}
                    </Card.Title>
                    <Card.Description className="text-sm">
                      {t`in ${option.time} • ${option.capacity}`}
                    </Card.Description>
                    {option.description && (
                      <Card.Description className="text-xs text-success mt-1">
                        {option.description}
                      </Card.Description>
                    )}
                  </Card.Body>
                  <View className="flex-row items-center">
                    <AppText className="text-base font-semibold text-foreground">
                      {option.price}
                    </AppText>
                    {option.highlight && (
                      <StyledIonicons
                        name="chevron-forward"
                        size={20}
                        className="text-muted ms-2 rtl:-scale-x-100"
                      />
                    )}
                  </View>
                </Card>
              ))}
            </View>
            <View className="px-3">
              <View className="px-4 mb-6">
                <BottomSheet.Title className="font-semibold mb-3">
                  {t`Trip Details`}
                </BottomSheet.Title>
                <BottomSheet.Description className="text-sm mb-2">
                  {t`Estimated arrival time: 10 minutes`}
                </BottomSheet.Description>
                <BottomSheet.Description className="text-sm mb-2">
                  {t`Distance: 4.2 km`}
                </BottomSheet.Description>
                <BottomSheet.Description className="text-sm">
                  {t`Your driver will arrive at the pickup location shortly. Please be ready when they arrive.`}
                </BottomSheet.Description>
              </View>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
