import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import { Accordion, cn, PressableFeedback, useToast } from 'heroui-native';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ChevronRightIcon } from '../../../components/icons/chevron-right';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

type Component = {
  title: string;
  path: string;
};

const components: Component[] = [
  {
    title: 'Accordion',
    path: 'accordion',
  },
  {
    title: 'Avatar',
    path: 'avatar',
  },
  {
    title: 'BottomSheet',
    path: 'bottom-sheet',
  },
  {
    title: 'Button',
    path: 'button',
  },
  {
    title: 'Card',
    path: 'card',
  },
  {
    title: 'Checkbox',
    path: 'checkbox',
  },
  {
    title: 'Chip',
    path: 'chip',
  },
  {
    title: 'CloseButton',
    path: 'close-button',
  },
  {
    title: 'ControlField',
    path: 'control-field',
  },
  {
    title: 'Description',
    path: 'description',
  },
  {
    title: 'Dialog',
    path: 'dialog',
  },
  {
    title: 'FieldError',
    path: 'field-error',
  },
  {
    title: 'Input',
    path: 'input',
  },
  {
    title: 'InputOTP',
    path: 'input-otp',
  },
  {
    title: 'Label',
    path: 'label',
  },
  {
    title: 'Popover',
    path: 'popover',
  },
  {
    title: 'PressableFeedback',
    path: 'pressable-feedback',
  },
  {
    title: 'RadioGroup',
    path: 'radio-group',
  },
  {
    title: 'ScrollShadow',
    path: 'scroll-shadow',
  },
  {
    title: 'Select',
    path: 'select',
  },
  {
    title: 'Separator',
    path: 'separator',
  },
  {
    title: 'Skeleton',
    path: 'skeleton',
  },
  {
    title: 'Spinner',
    path: 'spinner',
  },
  {
    title: 'Surface',
    path: 'surface',
  },
  {
    title: 'Switch',
    path: 'switch',
  },
  {
    title: 'Tabs',
    path: 'tabs',
  },
  {
    title: 'TextArea',
    path: 'text-area',
  },
  {
    title: 'TextField',
    path: 'text-field',
  },
  {
    title: 'Toast',
    path: 'toast',
  },
];

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  const { toast, isToastVisible } = useToast();

  useEffect(() => {
    if (isToastVisible && pathname === '/components') {
      toast.hide('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastVisible, pathname]);

  return (
    <ScreenScrollView contentContainerClassName="px-4">
      <View className="h-5" />
      <Accordion
        isCollapsible={false}
        variant="surface"
        classNames={{
          separator: cn(Platform.OS === 'android' && 'h-px opacity-30'),
        }}
      >
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/components/${item.path}`);
              }}
              asChild
            >
              <PressableFeedback>
                <AppText className="text-foreground text-base ml-1">
                  {item.title}
                </AppText>
                <Accordion.Indicator>
                  <ChevronRightIcon size={16} colorClassName="accent-muted" />
                </Accordion.Indicator>
              </PressableFeedback>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}
