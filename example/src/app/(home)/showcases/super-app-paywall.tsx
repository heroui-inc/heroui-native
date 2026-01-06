import type { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { BottomSheet } from 'heroui-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  PaywallFooter,
  SuperAppPaywallContent,
} from '../../../components/showcases/super-app-paywall/paywall-content';

export default function SuperAppPaywall() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const router = useRouter();
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setTimeout(() => {
        setIsBottomSheetOpen(true);
      }, 250);
    }
  }, []);

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => <PaywallFooter {...props} />,
    []
  );

  return (
    <View className="flex-1 bg-background">
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onOpenChange={(value) => {
          setIsBottomSheetOpen(value);
          if (!value) {
            router.back();
          }
        }}
      >
        <BottomSheet.Portal>
          <BottomSheet.Overlay />
          <BottomSheet.Content
            snapPoints={['90%']}
            enableDynamicSizing={false}
            enableOverDrag={false}
            handleClassName="hidden"
            backgroundClassName="bg-background"
            contentContainerClassName="h-full rounded-t-3xl p-0 pb-0 overflow-hidden"
            footerComponent={renderFooter}
          >
            <SuperAppPaywallContent />
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </View>
  );
}
