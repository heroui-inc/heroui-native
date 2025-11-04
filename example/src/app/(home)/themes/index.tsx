/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  RadioGroup,
  Spinner,
  Surface,
  Switch,
  TextField,
  useThemeColor,
} from 'heroui-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { useAppTheme } from '../../../contexts/app-theme-context';

type ThemeOption = {
  id: string;
  name: string;
  lightVariant: string;
  darkVariant: string;
  colors: { primary: string; secondary: string; tertiary: string };
};

const availableThemes: ThemeOption[] = [
  {
    id: 'default',
    name: 'Default',
    lightVariant: 'light',
    darkVariant: 'dark',
    colors: {
      primary: '#006FEE',
      secondary: '#17C964',
      tertiary: '#F5A524',
    },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    lightVariant: 'lavender-light',
    darkVariant: 'lavender-dark',
    colors: {
      primary: 'hsl(270 50% 75%)',
      secondary: 'hsl(160 40% 70%)',
      tertiary: 'hsl(45 55% 75%)',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    lightVariant: 'mint-light',
    darkVariant: 'mint-dark',
    colors: {
      primary: 'hsl(165 45% 70%)',
      secondary: 'hsl(145 50% 68%)',
      tertiary: 'hsl(55 60% 75%)',
    },
  },
  {
    id: 'sky',
    name: 'Sky',
    lightVariant: 'sky-light',
    darkVariant: 'sky-dark',
    colors: {
      primary: 'hsl(200 50% 72%)',
      secondary: 'hsl(175 45% 70%)',
      tertiary: 'hsl(48 58% 75%)',
    },
  },
];

const ThemeCircle: React.FC<{
  theme: ThemeOption;
  isActive: boolean;
  onPress: () => void;
}> = ({ theme, isActive, onPress }) => {
  const themeColorAccent = useThemeColor('accent');

  return (
    <Pressable onPress={onPress} className="items-center">
      <View style={{ position: 'relative', padding: 4 }}>
        {/* Active ring */}
        {isActive && (
          <View
            style={{
              position: 'absolute',
              width: 68,
              height: 68,
              borderRadius: 34,
              borderWidth: 2,
              borderColor: themeColorAccent,
              top: 0,
              left: 0,
            }}
          />
        )}
        {/* Theme circle */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* First section - 50% */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.primary,
            }}
          />

          {/* Second section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '50%',
              backgroundColor: theme.colors.secondary,
              bottom: 0,
            }}
          />

          {/* Third section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              backgroundColor: theme.colors.tertiary,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>
      <Text className="text-xs mt-2 text-foreground font-medium">
        {theme.name}
      </Text>
    </Pressable>
  );
};

export default function Themes() {
  const { currentTheme, setTheme, isLight } = useAppTheme();
  const [switchValue, setSwitchValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [textValue, setTextValue] = React.useState('');

  const getCurrentThemeId = () => {
    if (currentTheme === 'light' || currentTheme === 'dark') return 'default';
    if (currentTheme.startsWith('lavender')) return 'lavender';
    if (currentTheme.startsWith('mint')) return 'mint';
    if (currentTheme.startsWith('sky')) return 'sky';
    return 'default';
  };

  const handleThemeSelect = (theme: ThemeOption) => {
    const variant = isLight ? theme.lightVariant : theme.darkVariant;
    setTheme(variant as any);
  };

  return (
    <ScreenScrollView contentContainerClassName="px-0">
      {/* Theme Selector */}
      <View className="px-5 py-8 bg-overlay border-b border-divider">
        <Text className="text-lg font-bold text-foreground mb-4">
          Select Theme
        </Text>
        <View className="flex-row justify-around">
          {availableThemes.map((theme) => (
            <ThemeCircle
              key={theme.id}
              theme={theme}
              isActive={getCurrentThemeId() === theme.id}
              onPress={() => handleThemeSelect(theme)}
            />
          ))}
        </View>
      </View>

      {/* Component Showcase */}
      <View className="px-5 py-8">
        {/* Color Palette Preview */}
        <View className="mb-12">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Current Theme Colors
          </Text>
          <View className="gap-4">
            <View className="flex-row gap-3">
              <View className="flex-1 h-16 bg-background border border-border rounded-2xl items-center justify-center">
                <Text className="text-xs text-foreground">Background</Text>
              </View>
              <View className="flex-1 h-16 bg-overlay rounded-2xl items-center justify-center">
                <Text className="text-xs text-foreground">Panel</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 h-16 bg-accent rounded-2xl items-center justify-center">
                <Text className="text-xs text-accent-foreground">Accent</Text>
              </View>
              <View className="flex-1 h-16 bg-accent-soft rounded-2xl items-center justify-center">
                <Text className="text-xs text-accent-soft-foreground">
                  Accent Soft
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 h-16 bg-success rounded-2xl items-center justify-center">
                <Text className="text-xs text-success-foreground">Success</Text>
              </View>
              <View className="flex-1 h-16 bg-warning rounded-2xl items-center justify-center">
                <Text className="text-xs text-warning-foreground">Warning</Text>
              </View>
              <View className="flex-1 h-16 bg-danger rounded-2xl items-center justify-center">
                <Text className="text-xs text-danger-foreground">Danger</Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-2xl font-bold text-foreground mb-6">
          Component Showcase
        </Text>

        {/* Card Section */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Cards
          </Text>
          <Card className="mb-6">
            <Card.Header className="pb-3">
              <Text className="text-lg font-semibold text-foreground">
                Beautiful Card
              </Text>
            </Card.Header>
            <Card.Body className="py-4">
              <Text className="text-foreground">
                This is a card component with header, body, and footer sections.
                The theme colors are automatically applied.
              </Text>
            </Card.Body>
            <Card.Footer className="pt-3">
              <View className="flex-row gap-2">
                <Button variant="primary" size="sm">
                  Action
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </View>
            </Card.Footer>
          </Card>

          <Card className="border border-border">
            <Card.Body className="p-5">
              <Text className="text-foreground font-medium mb-2">
                Bordered Card Variant
              </Text>
              <Text className="text-muted">
                This card uses the bordered variant for a subtle outline.
              </Text>
            </Card.Body>
          </Card>
        </View>

        <Divider className="my-8" />

        {/* Buttons Section */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Buttons
          </Text>
          <View className="gap-3">
            <View className="flex-row gap-2 flex-wrap">
              <Button variant="primary" size="md">
                Primary
              </Button>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="tertiary" size="md">
                Tertiary
              </Button>
            </View>
            <View className="flex-row gap-2 flex-wrap">
              <Button variant="ghost" size="md">
                Ghost
              </Button>
              <Button variant="destructive" size="md">
                Danger
              </Button>
            </View>
            <View className="flex-row gap-3">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </View>
          </View>
        </View>

        <Divider className="my-8" />

        {/* Form Controls Section */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Form Controls
          </Text>

          {/* Text Fields */}
          <View className="gap-5 mb-6">
            <TextField>
              <TextField.Label>Name</TextField.Label>
              <TextField.Input
                placeholder="Enter your name"
                value={textValue}
                onChangeText={setTextValue}
              />
            </TextField>
            <TextField>
              <TextField.Label>Email</TextField.Label>
              <TextField.Input placeholder="example@email.com" />
            </TextField>
            <TextField>
              <TextField.Label>Password</TextField.Label>
              <TextField.Input placeholder="Enter password" secureTextEntry />
            </TextField>
          </View>

          {/* Switches */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-foreground mb-3">
              Switches
            </Text>
            <View className="flex-row gap-4">
              <Switch
                isSelected={switchValue}
                onSelectedChange={setSwitchValue}
              />
              <Switch isSelected={true} onSelectedChange={() => {}} />
              <Switch isSelected={false} onSelectedChange={() => {}} />
              <Switch
                isSelected={true}
                isDisabled
                onSelectedChange={() => {}}
              />
            </View>
          </View>

          {/* Checkboxes */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-foreground mb-3">
              Checkboxes
            </Text>
            <View className="flex-row gap-4">
              <Checkbox
                isSelected={checkboxValue}
                onSelectedChange={setCheckboxValue}
              />
              <Checkbox isSelected={true} onSelectedChange={() => {}} />
              <Checkbox isSelected={false} onSelectedChange={() => {}} />
              <Checkbox
                isSelected={true}
                isDisabled
                onSelectedChange={() => {}}
              />
            </View>
          </View>

          {/* Radio Group */}
          <View>
            <Text className="text-sm font-medium text-foreground mb-3">
              Radio Group
            </Text>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
              <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
              <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
            </RadioGroup>
          </View>
        </View>

        <Divider className="my-8" />

        {/* Chips Section */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Chips
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            <Chip variant="primary" color="accent">
              Primary
            </Chip>
            <Chip variant="secondary" color="accent">
              Secondary
            </Chip>
            <Chip variant="tertiary" color="accent">
              Tertiary
            </Chip>
          </View>
          <View className="flex-row gap-2 flex-wrap mt-4">
            <Chip variant="primary" color="default">
              Default
            </Chip>
            <Chip variant="primary" color="success">
              Success
            </Chip>
            <Chip variant="primary" color="warning">
              Warning
            </Chip>
            <Chip variant="primary" color="danger">
              Danger
            </Chip>
          </View>
          <View className="flex-row gap-2 flex-wrap mt-4">
            <Chip size="sm" variant="primary">
              Small
            </Chip>
            <Chip size="md" variant="primary">
              Medium
            </Chip>
            <Chip size="lg" variant="primary">
              Large
            </Chip>
          </View>
        </View>

        <Divider className="my-8" />

        {/* Surface Section */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Surfaces
          </Text>
          <View className="gap-4">
            <Surface variant="default" className="p-5">
              <Text className="text-foreground">Surface Default</Text>
            </Surface>
            <Surface variant="secondary" className="p-5">
              <Text className="text-foreground">Surface Secondary</Text>
            </Surface>
            <Surface variant="tertiary" className="p-5">
              <Text className="text-foreground">Surface Tertiary</Text>
            </Surface>
            <Surface variant="quaternary" className="p-5">
              <Text className="text-foreground">Surface Quaternary</Text>
            </Surface>
          </View>
        </View>

        <Divider className="my-8" />

        {/* Loading States */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Loading States
          </Text>
          <View className="flex-row gap-4 items-center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <View className="ml-4">
              <Button variant="primary" isDisabled>
                Disabled
              </Button>
            </View>
          </View>
        </View>

        <Divider className="my-8" />

        {/* Typography Section */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-4">
            Typography
          </Text>
          <View className="gap-3">
            <Text className="text-4xl font-bold text-foreground">
              Heading 1
            </Text>
            <Text className="text-3xl font-bold text-foreground">
              Heading 2
            </Text>
            <Text className="text-2xl font-semibold text-foreground">
              Heading 3
            </Text>
            <Text className="text-xl font-medium text-foreground">
              Heading 4
            </Text>
            <Text className="text-lg text-foreground">Body Large</Text>
            <Text className="text-base text-foreground">Body Regular</Text>
            <Text className="text-sm text-muted">Body Small</Text>
            <Text className="text-xs text-muted">Caption</Text>
            <Text className="text-base text-link underline">Link Text</Text>
            <Text className="text-base text-success">Success Text</Text>
            <Text className="text-base text-warning">Warning Text</Text>
            <Text className="text-base text-danger">Danger Text</Text>
          </View>
        </View>
      </View>
    </ScreenScrollView>
  );
}
