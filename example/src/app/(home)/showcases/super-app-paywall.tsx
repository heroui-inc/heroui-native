import { useRouter } from 'expo-router';
import { BottomSheet, useThemeColor, type BottomSheetRef } from 'heroui-native';
import { useEffect, useRef } from 'react';
import { View, type ScrollViewInstance } from 'react-native';
import {
  PaywallFooter,
  SuperAppPaywallContent,
} from '../../../components/showcases/super-app-paywall/paywall-content';

export default function SuperAppPaywall() {
  const router = useRouter();
  const sheetRef = useRef<BottomSheetRef>(null);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const themeColorBackground = useThemeColor('background');

  useEffect(() => {
    const timeout = setTimeout(() => {
      sheetRef.current?.present();
    }, 250);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <BottomSheet
        ref={sheetRef}
        detents={[0.9]}
        grabber={false}
        backgroundColor={themeColorBackground}
        scrollableRef={scrollRef}
        footer={<PaywallFooter />}
        footerOptions={{ position: 'absolute' }}
        contentContainerClassName="h-full p-0 pb-0 rounded-t-3xl overflow-hidden"
        onDidDismiss={() => router.back()}
      >
        <SuperAppPaywallContent scrollRef={scrollRef} />
      </BottomSheet>
    </View>
  );
}
