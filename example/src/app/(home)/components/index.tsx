import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Accordion, useTheme } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

const ComponentIcon = () => {
  const { colors } = useTheme();

  return (
    <MaterialCommunityIcons
      name="atom"
      size={16}
      color={colors.mutedForeground}
    />
  );
};

type Component = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

const components: Component[] = [
  {
    title: 'Accordion',
    icon: <ComponentIcon />,
    path: 'accordion',
  },
  {
    title: 'Avatar',
    icon: <ComponentIcon />,
    path: 'avatar',
  },
  {
    title: 'Button',
    icon: <ComponentIcon />,
    path: 'button',
  },
  {
    title: 'Card',
    icon: <ComponentIcon />,
    path: 'card',
  },
  {
    title: 'Checkbox',
    icon: <ComponentIcon />,
    path: 'checkbox',
  },
  {
    title: 'Chip',
    icon: <ComponentIcon />,
    path: 'chip',
  },
  {
    title: 'Divider',
    icon: <ComponentIcon />,
    path: 'divider',
  },
  {
    title: 'Drop Shadow View',
    icon: <ComponentIcon />,
    path: 'drop-shadow-view',
  },
  {
    title: 'Error View',
    icon: <ComponentIcon />,
    path: 'error-view',
  },
  {
    title: 'Form Field',
    icon: <ComponentIcon />,
    path: 'form-field',
  },
  {
    title: 'Radio Group',
    icon: <ComponentIcon />,
    path: 'radio',
  },
  {
    title: 'Spinner',
    icon: <ComponentIcon />,
    path: 'spinner',
  },
  {
    title: 'Surface',
    icon: <ComponentIcon />,
    path: 'surface',
  },
  {
    title: 'Switch',
    icon: <ComponentIcon />,
    path: 'switch',
  },
  {
    title: 'Text Field',
    icon: <ComponentIcon />,
    path: 'text-field',
  },
];

export default function App() {
  const router = useRouter();

  const { colors } = useTheme();

  return (
    <ScreenScrollView>
      <View className="h-5" />
      <Accordion variant="border" isCollapsible={false}>
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              className="bg-surface-2"
              onPress={() => router.push(`/components/${item.path}`)}
            >
              <View className="flex-row items-center flex-1 gap-3">
                {item.icon}
                <AppText className="text-foreground text-base flex-1">
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.mutedForeground}
                />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}
