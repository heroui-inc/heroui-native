import { useRouter } from 'expo-router';
import { Accordion, useTheme } from 'heroui-native';
import { Atom, ChevronRight } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';

const ComponentIcon = () => {
  const { colors } = useTheme();

  return <Atom size={16} color={colors.mutedForeground} strokeWidth={1.5} />;
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
    title: 'Error Field',
    icon: <ComponentIcon />,
    path: 'error-field',
  },
  {
    title: 'Form Field',
    icon: <ComponentIcon />,
    path: 'form-field',
  },
  {
    title: 'Radio Group',
    icon: <ComponentIcon />,
    path: 'radio-group',
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
      <View className="items-center justify-center mb-8">
        <Image
          source={{ uri: 'https://heroui.com/isotipo.png' }}
          className="w-20 h-20"
        />
      </View>
      <Accordion variant="border" isCollapsible={false}>
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              className="bg-surface-2"
              onPress={() => router.push(item.path)}
            >
              <View className="flex-row items-center flex-1 gap-3">
                {item.icon}
                <Text className="text-foreground text-base flex-1">
                  {item.title}
                </Text>
              </View>
              <Accordion.Indicator>
                <ChevronRight size={16} color={colors.mutedForeground} />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}
