import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import { Accordion, PressableFeedback, useToast } from 'heroui-native';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

const StyledIonicons = withUniwind(Ionicons);

type Component = {
  title: string;
  path: string;
};

type ComponentGroup = {
  title: string;
  components: Component[];
};

const componentGroups: ComponentGroup[] = [
  {
    title: 'Buttons',
    components: [
      {
        title: 'Button',
        path: 'button',
      },
    ],
  },
  {
    title: 'Forms',
    components: [
      {
        title: 'Checkbox',
        path: 'checkbox',
      },
      {
        title: 'Description',
        path: 'description',
      },
      {
        title: 'Error View',
        path: 'error-view',
      },
      {
        title: 'Form Field',
        path: 'form-field',
      },
      {
        title: 'Input OTP',
        path: 'input-otp',
      },
      {
        title: 'Label',
        path: 'label',
      },
      {
        title: 'Radio Group',
        path: 'radio-group',
      },
      {
        title: 'Select',
        path: 'select',
      },
      {
        title: 'Switch',
        path: 'switch',
      },
      {
        title: 'Text Field',
        path: 'text-field',
      },
    ],
  },
  {
    title: 'Navigation',
    components: [
      {
        title: 'Accordion',
        path: 'accordion',
      },
      {
        title: 'Tabs',
        path: 'tabs',
      },
    ],
  },
  {
    title: 'Overlays',
    components: [
      {
        title: 'Bottom Sheet',
        path: 'bottom-sheet',
      },
      {
        title: 'Dialog',
        path: 'dialog',
      },
      {
        title: 'Popover',
        path: 'popover',
      },
      {
        title: 'Toast',
        path: 'toast',
      },
    ],
  },
  {
    title: 'Feedback',
    components: [
      {
        title: 'Skeleton',
        path: 'skeleton',
      },
      {
        title: 'Spinner',
        path: 'spinner',
      },
    ],
  },
  {
    title: 'Layout',
    components: [
      {
        title: 'Card',
        path: 'card',
      },
      {
        title: 'Divider',
        path: 'divider',
      },
      {
        title: 'Surface',
        path: 'surface',
      },
    ],
  },
  {
    title: 'Media',
    components: [
      {
        title: 'Avatar',
        path: 'avatar',
      },
    ],
  },
  {
    title: 'Data Display',
    components: [
      {
        title: 'Chip',
        path: 'chip',
      },
    ],
  },
  {
    title: 'Utilities',
    components: [
      {
        title: 'Pressable Feedback',
        path: 'pressable-feedback',
      },
      {
        title: 'Scroll Shadow',
        path: 'scroll-shadow',
      },
    ],
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
      {componentGroups.map((group) => (
        <View key={group.title} className="mb-6">
          <AppText className="text-muted text-sm text-center uppercase mb-2">
            {group.title}
          </AppText>
          <Accordion isCollapsible={false} variant="surface">
            {group.components.map((item) => (
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
                      <StyledIonicons
                        name="chevron-forward"
                        size={16}
                        className="text-muted"
                      />
                    </Accordion.Indicator>
                  </PressableFeedback>
                </Accordion.Trigger>
              </Accordion.Item>
            ))}
          </Accordion>
        </View>
      ))}
    </ScreenScrollView>
  );
}
