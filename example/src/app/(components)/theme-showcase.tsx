/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
  Surface,
  Switch,
  TextField,
  useTheme,
} from 'heroui-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAppTheme } from '../../contexts/app-theme-context';

// Theme Selector Circle Component
const ThemeCircle: React.FC<{
  themeId: string;
  themeName: string;
  colors: { primary: string; secondary: string; tertiary: string };
  isActive: boolean;
  onPress: () => void;
}> = ({ colors, isActive, onPress, themeName }) => {
  const { colors: themeColors } = useTheme();

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
              borderColor: themeColors.accent,
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
              backgroundColor: colors.primary,
            }}
          />

          {/* Second section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '50%',
              backgroundColor: colors.secondary,
              bottom: 0,
            }}
          />

          {/* Third section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              backgroundColor: colors.tertiary,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>
      <Text className="text-xs mt-2 text-foreground font-medium">
        {themeName}
      </Text>
    </Pressable>
  );
};

export default function ThemeShowcase() {
  const { currentThemeId, setThemeById, availableThemes } = useAppTheme();
  const [switchValue, setSwitchValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [textValue, setTextValue] = React.useState('');

  // Extract colors from current theme for the circles
  const getThemeColors = (theme: (typeof availableThemes)[number]) => {
    if (theme.id === 'default') {
      // Use HeroUI's default theme colors
      return {
        primary: '#006FEE', // HeroUI default primary/accent
        secondary: '#17C964', // HeroUI default success
        tertiary: '#F5A524', // HeroUI default warning
      };
    }
    const lightColors = theme.config?.light?.colors;
    return {
      primary: lightColors?.accent || '#000',
      secondary: lightColors?.success || '#000',
      tertiary: lightColors?.warning || '#000',
    };
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Theme Selector */}
      <View className="px-5 py-8 bg-panel border-b border-divider">
        <Text className="text-lg font-bold text-foreground mb-4">
          Select Theme
        </Text>
        <View className="flex-row justify-around">
          {availableThemes.map((theme) => (
            <ThemeCircle
              key={theme.id}
              themeId={theme.id}
              themeName={
                theme.id === 'default'
                  ? 'Default'
                  : (theme.name.split(' ')[0] as string)
              }
              colors={getThemeColors(theme)}
              isActive={currentThemeId === theme.id}
              onPress={() => setThemeById(theme.id)}
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
              <View className="flex-1 h-16 bg-background border border-border rounded-lg items-center justify-center">
                <Text className="text-xs text-foreground">Background</Text>
              </View>
              <View className="flex-1 h-16 bg-panel rounded-lg items-center justify-center">
                <Text className="text-xs text-foreground">Panel</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 h-16 bg-accent rounded-lg items-center justify-center">
                <Text className="text-xs text-accent-foreground">Accent</Text>
              </View>
              <View className="flex-1 h-16 bg-accent-soft rounded-lg items-center justify-center">
                <Text className="text-xs text-accent-soft-foreground">
                  Accent Soft
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 h-16 bg-success rounded-lg items-center justify-center">
                <Text className="text-xs text-success-foreground">Success</Text>
              </View>
              <View className="flex-1 h-16 bg-warning rounded-lg items-center justify-center">
                <Text className="text-xs text-warning-foreground">Warning</Text>
              </View>
              <View className="flex-1 h-16 bg-danger rounded-lg items-center justify-center">
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
              <Text className="text-muted-foreground">
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
              <Button variant="danger" size="md">
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
              <Radio value="option1">
                <Radio.Content>
                  <Radio.Label>Option 1</Radio.Label>
                </Radio.Content>
              </Radio>
              <Radio value="option2">
                <Radio.Content>
                  <Radio.Label>Option 2</Radio.Label>
                </Radio.Content>
              </Radio>
              <Radio value="option3">
                <Radio.Content>
                  <Radio.Label>Option 3</Radio.Label>
                </Radio.Content>
              </Radio>
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
            <Surface variant="1" className="p-5">
              <Text className="text-foreground">Surface Variant 1</Text>
            </Surface>
            <Surface variant="2" className="p-5">
              <Text className="text-foreground">Surface Variant 2</Text>
            </Surface>
            <Surface variant="3" className="p-5">
              <Text className="text-foreground">Surface Variant 3</Text>
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
        <View className="mb-10">
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
            <Text className="text-sm text-muted-foreground">Body Small</Text>
            <Text className="text-xs text-muted-foreground">Caption</Text>
            <Text className="text-base text-link underline">Link Text</Text>
            <Text className="text-base text-success">Success Text</Text>
            <Text className="text-base text-warning">Warning Text</Text>
            <Text className="text-base text-danger">Danger Text</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
