import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import { Accordion, useToast } from 'heroui-native';
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
    title: 'Bottom Sheet',
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
    title: 'Dialog',
    path: 'dialog',
  },
  {
    title: 'Divider',
    path: 'divider',
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
    title: 'Popover',
    path: 'popover',
  },
  {
    title: 'Pressable Feedback',
    path: 'pressable-feedback',
  },
  {
    title: 'Radio Group',
    path: 'radio-group',
  },
  {
    title: 'Scroll Shadow',
    path: 'scroll-shadow',
  },
  {
    title: 'Select',
    path: 'select',
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
    title: 'Text Field',
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
      <Accordion isCollapsible={false} variant="surface">
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/components/${item.path}`);
              }}
            >
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
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}
