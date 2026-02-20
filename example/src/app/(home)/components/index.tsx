import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import {
  ListGroup,
  PressableFeedback,
  Separator,
  useToast,
} from 'heroui-native';
import { Fragment, useEffect } from 'react';
import { Platform, View } from 'react-native';
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
    title: 'Alert',
    path: 'alert',
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
    title: 'ListGroup',
    path: 'list-group',
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
    title: 'SearchField',
    path: 'search-field',
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
    title: 'Slider',
    path: 'slider',
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
      <ListGroup>
        {components.map((item, index) => (
          <Fragment key={item.title}>
            {index > 0 && <Separator className="mx-4" />}
            <PressableFeedback
              animation={false}
              onPress={() => {
                console.log('onPress', item.path);
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/components/${item.path}`);
              }}
            >
              <PressableFeedback.Scale>
                <ListGroup.Item disabled>
                  <ListGroup.ItemContent>
                    <ListGroup.ItemTitle className="font-normal">
                      {item.title}
                    </ListGroup.ItemTitle>
                  </ListGroup.ItemContent>
                  <ListGroup.ItemSuffix />
                </ListGroup.Item>
              </PressableFeedback.Scale>
            </PressableFeedback>
          </Fragment>
        ))}
      </ListGroup>
    </ScreenScrollView>
  );
}
