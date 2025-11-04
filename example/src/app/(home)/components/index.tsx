import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Accordion } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);
const StyledIonicons = withUniwind(Ionicons);

const ComponentIcon = () => {
  return (
    <StyledMaterialCommunityIcons
      name="atom"
      size={16}
      className="text-muted"
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
    title: 'Dialog',
    icon: <ComponentIcon />,
    path: 'dialog',
  },
  {
    title: 'Divider',
    icon: <ComponentIcon />,
    path: 'divider',
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
    title: 'Popover',
    icon: <ComponentIcon />,
    path: 'popover',
  },
  {
    title: 'Radio Group',
    icon: <ComponentIcon />,
    path: 'radio-group',
  },
  {
    title: 'Scroll Shadow',
    icon: <ComponentIcon />,
    path: 'scroll-shadow',
  },
  {
    title: 'Select',
    icon: <ComponentIcon />,
    path: 'select',
  },
  {
    title: 'Skeleton',
    icon: <ComponentIcon />,
    path: 'skeleton',
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
    title: 'Tabs',
    icon: <ComponentIcon />,
    path: 'tabs',
  },
  {
    title: 'Text Field',
    icon: <ComponentIcon />,
    path: 'text-field',
  },
];

export default function App() {
  const router = useRouter();

  return (
    <ScreenScrollView contentContainerClassName="px-4">
      <View className="h-5" />
      <Accordion isCollapsible={false} variant="surface">
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              highlightOpacity={0.25}
              onPress={() => router.push(`/components/${item.path}`)}
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
