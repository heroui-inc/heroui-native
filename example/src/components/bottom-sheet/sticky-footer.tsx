import { useLingui } from '@lingui/react/macro';
import {
  BottomSheet,
  Button,
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

/**
 * Long terms text between a sticky header and a sticky footer. The header
 * and the actions stay in place while the body scrolls; `scrollableRef`
 * hands the scroll view to the sheet, so dragging it expands the sheet first.
 */
export const StickyFooterContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);
  const scrollableRef = useRef<ScrollViewInstance>(null);

  const sections = [
    {
      title: t`1. Using the service`,
      body: t`You may use the service only in compliance with these terms and all applicable laws. You are responsible for any activity that happens under your account.`,
    },
    {
      title: t`2. Your content`,
      body: t`You keep ownership of the content you upload. You grant us a license to host and display it so the service can work as intended.`,
    },
    {
      title: t`3. Privacy`,
      body: t`We collect the information needed to run the service and improve it. Read the Privacy Policy to learn what we collect and how we use it.`,
    },
    {
      title: t`4. Payments`,
      body: t`Paid plans renew automatically until you cancel. Fees are charged at the start of each billing period and are not refundable except where required by law.`,
    },
    {
      title: t`5. Termination`,
      body: t`You can stop using the service at any time. We may suspend or end access if these terms are broken or if required to protect other users.`,
    },
    {
      title: t`6. Changes`,
      body: t`We may update these terms from time to time. When we do, we will let you know in the app before the changes take effect.`,
    },
  ];

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>
            {t`Sticky header and footer`}
          </Button.Label>
        </Button>
        <BottomSheet
          ref={sheetRef}
          detents={[0.6, 1]}
          scrollableRef={scrollableRef}
          style={styles.flex}
        >
          <BottomSheet.Content className="flex-1 px-0">
            <BottomSheet.Header
              isSticky
              className="flex-row items-start justify-between pb-4 gap-4"
            >
              <View className="flex-1 gap-1">
                <BottomSheet.Title>{t`Terms of Service`}</BottomSheet.Title>
                <BottomSheet.Description>
                  {t`Please review before you continue.`}
                </BottomSheet.Description>
              </View>
              <BottomSheet.Close />
            </BottomSheet.Header>
            <BottomSheet.Body className="flex-1">
              <Separator />
              <ScrollView
                ref={scrollableRef}
                className="flex-1"
                contentContainerClassName="px-5 py-4 gap-5"
              >
                {sections.map((section) => (
                  <View key={section.title} className="gap-1.5">
                    <BottomSheet.Title className="text-base">
                      {section.title}
                    </BottomSheet.Title>
                    <BottomSheet.Description>
                      {section.body}
                    </BottomSheet.Description>
                  </View>
                ))}
              </ScrollView>
            </BottomSheet.Body>
            <BottomSheet.Footer isSticky className="gap-3">
              <Separator className="-mx-5 mb-2" />
              <Button onPress={() => sheetRef.current?.dismiss()}>
                {t`Accept`}
              </Button>
              <Button
                variant="tertiary"
                onPress={() => sheetRef.current?.dismiss()}
              >
                {t`Decline`}
              </Button>
            </BottomSheet.Footer>
          </BottomSheet.Content>
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
