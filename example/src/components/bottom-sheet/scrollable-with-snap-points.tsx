import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetFooter, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheet, Button, Card, cn, Separator } from 'heroui-native';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../contexts/app-theme-context';
import { AppText } from '../app-text';

const StyledIonicons = withUniwind(Ionicons);

export const ScrollableWithSnapPointsContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isDark } = useAppTheme();

  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const taxiOptions = [
    {
      id: 'priority',
      name: 'Taxi Priority',
      icon: 'flash-outline' as const,
      time: '1 min',
      capacity: '4',
      price: 'c. €12-19',
      highlight: false,
    },
    {
      id: 'comfort',
      name: 'Taxi Comfort',
      icon: 'star-outline' as const,
      time: '6 min',
      capacity: '4',
      price: 'c. €11-18',
      highlight: false,
    },
    {
      id: 'green',
      name: 'Green Taxi',
      icon: 'leaf-outline' as const,
      time: '6 min',
      capacity: '4',
      price: 'c. €11-17',
      highlight: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: 'car-sport-outline' as const,
      time: '10 min',
      capacity: '4',
      description: 'High end cars, top drivers',
      price: '€30.89',
      highlight: true,
    },
    {
      id: 'xl',
      name: 'Taxi XL',
      icon: 'car-outline' as const,
      time: '2 min',
      capacity: '5-8',
      price: 'c. €12-19',
      highlight: false,
    },
  ];

  const renderFooter = useCallback(
    (props: { animatedFooterPosition: any }) => (
      <BottomSheetFooter {...props}>
        <View className="px-4 pb-safe-offset-3 bg-overlay">
          <Separator className="-mx-4 mb-3" />
          <Button variant="danger" onPress={() => setIsOpen(false)}>
            Order Premium now
          </Button>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Scrollable with snap points
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
              <View className="flex-row items-center justify-between pl-7 pr-5 pb-3">
                <BottomSheet.Title className="text-xl font-bold">
                  Select a way to travel
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
                          'size-12 items-center justify-center rounded-full mr-3',
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
                          in {option.time} • {option.capacity}
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
                            className="text-muted ml-2"
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
                    <View className="size-8 mr-3 items-center justify-center rounded-full bg-yellow-400">
                      <AppText className="text-xs font-bold text-black">
                        P
                      </AppText>
                    </View>
                    <Card.Body className="flex-1">
                      <Card.Title className="text-sm font-semibold">
                        10% off all trips with PLUS
                      </Card.Title>
                      <Card.Description className="text-xs">
                        Subscribe for €6.99/month
                      </Card.Description>
                    </Card.Body>
                    <StyledIonicons
                      name="chevron-forward"
                      size={20}
                      className="text-muted"
                    />
                  </Card>
                  <Card
                    className={cn(
                      'mb-8 flex-row items-center',
                      isDark ? 'bg-gray-900/40' : 'bg-gray-100'
                    )}
                  >
                    <View className="size-10 mr-3 items-center justify-center rounded-lg bg-red-500">
                      <StyledIonicons
                        name="person"
                        size={20}
                        className="text-white"
                      />
                    </View>
                    <Card.Body className="flex-1">
                      <Card.Title className="text-sm font-semibold">
                        Personal
                      </Card.Title>
                      <Card.Description className="text-xs">
                        Visa ••••
                      </Card.Description>
                    </Card.Body>
                    <StyledIonicons
                      name="chevron-forward"
                      size={20}
                      className="text-muted"
                    />
                  </Card>
                  <View className="px-4 mb-6">
                    <BottomSheet.Title className="font-semibold mb-3">
                      Trip Details
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-sm mb-2">
                      Estimated arrival time: 10 minutes
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm mb-2">
                      Distance: 4.2 km
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm">
                      Your driver will arrive at the pickup location shortly.
                      Please be ready when they arrive.
                    </BottomSheet.Description>
                  </View>
                  <View className="px-4 mb-6">
                    <BottomSheet.Title className="font-semibold mb-3">
                      Important Information
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-sm mb-2">
                      • All prices include taxes and fees
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm mb-2">
                      • Payment will be processed after trip completion
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm mb-2">
                      • Cancellation fees may apply if cancelled after 2 minutes
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm">
                      • For support, contact us through the app or call
                      +1-800-TAXI-HELP
                    </BottomSheet.Description>
                  </View>
                  <View className="px-4">
                    <BottomSheet.Title className="font-semibold mb-3">
                      Safety & Security
                    </BottomSheet.Title>
                    <BottomSheet.Description className="text-sm mb-2">
                      All our drivers are verified and background-checked. Your
                      safety is our top priority.
                    </BottomSheet.Description>
                    <BottomSheet.Description className="text-sm">
                      Share your trip details with friends and family for added
                      security.
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
