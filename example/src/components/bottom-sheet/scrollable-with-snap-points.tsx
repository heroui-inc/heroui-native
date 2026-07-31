import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetFooter, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useLingui } from '@lingui/react/macro';
import { BottomSheet, Button, Card, cn, Separator } from 'heroui-native';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../contexts/app-theme-context';
import { AppText } from '../app-text';

const StyledIonicons = withUniwind(Ionicons);

export const ScrollableWithSnapPointsContent = () => {
  const { t } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  const { isDark } = useAppTheme();

  const snapPoints = useMemo(() => ['40%', '80%'], []);

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

  const renderFooter = useCallback(
    (props: { animatedFooterPosition: any }) => (
      <BottomSheetFooter {...props}>
        <View className="px-4 pb-safe-offset-3 bg-overlay">
          <Separator className="-mx-4 mb-3" />
          <Button variant="danger" onPress={() => setIsOpen(false)}>
            {t`Order Premium now`}
          </Button>
        </View>
      </BottomSheetFooter>
    ),
    [t]
  );

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              <Button.Label maxFontSizeMultiplier={1.2}>
                {t`Scrollable with snap points`}
              </Button.Label>
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content
              snapPoints={snapPoints}
              enableOverDrag={false}
              enableDynamicSizing={false}
              footerComponent={renderFooter}
              contentContainerClassName="h-full px-0"
              handleComponent={() => null}
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
              <Separator className="-mx-5" />
              <BottomSheetScrollView
                contentContainerClassName="pb-safe-offset-12"
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
                  <Card
                    className={cn(
                      'mb-4 flex-row items-center',
                      isDark ? 'bg-amber-900/40' : 'bg-amber-50'
                    )}
                  >
                    <View className="size-8 me-3 items-center justify-center rounded-full bg-yellow-400">
                      <AppText className="text-xs font-bold text-black">
                        P
                      </AppText>
                    </View>
                    <Card.Body className="flex-1">
                      <Card.Title className="text-sm font-semibold">
                        {t`10% off all trips with PLUS`}
                      </Card.Title>
                      <Card.Description className="text-xs">
                        {t`Subscribe for €6.99/month`}
                      </Card.Description>
                    </Card.Body>
                    <StyledIonicons
                      name="chevron-forward"
                      size={20}
                      className="text-muted rtl:-scale-x-100"
                    />
                  </Card>
                  <Card
                    className={cn(
                      'mb-8 flex-row items-center',
                      isDark ? 'bg-gray-900/40' : 'bg-gray-100'
                    )}
                  >
                    <View className="size-10 me-3 items-center justify-center rounded-lg bg-red-500">
                      <StyledIonicons
                        name="person"
                        size={20}
                        className="text-white"
                      />
                    </View>
                    <Card.Body className="flex-1">
                      <Card.Title className="text-sm font-semibold">
                        {t`Personal`}
                      </Card.Title>
                      {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Card network brand plus masked digits. */}
                      <Card.Description className="text-xs">
                        Visa ••••
                      </Card.Description>
                    </Card.Body>
                    <StyledIonicons
                      name="chevron-forward"
                      size={20}
                      className="text-muted rtl:-scale-x-100"
                    />
                  </Card>
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
                  <View className="px-4 mb-6">
                    <BottomSheet.Title className="font-semibold mb-3">
                      {t`Important Information`}
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-sm mb-2">
                      {t`• All prices include taxes and fees`}
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm mb-2">
                      {t`• Payment will be processed after trip completion`}
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm mb-2">
                      {t`• Cancellation fees may apply if cancelled after 2 minutes`}
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm">
                      {t`• For support, contact us through the app or call +1-800-TAXI-HELP`}
                    </BottomSheet.Description>
                  </View>
                  <View className="px-4">
                    <BottomSheet.Title className="font-semibold mb-3">
                      {t`Safety & Security`}
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-sm mb-2">
                      {t`All our drivers are verified and background-checked. Your safety is our top priority.`}
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm">
                      {t`Share your trip details with friends and family for added security.`}
                    </BottomSheet.Description>
                  </View>
                </View>
              </BottomSheetScrollView>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
