import { Ionicons } from '@expo/vector-icons';
import { Divider, FormField, Surface, Switch } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

interface SwitchFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => (
  <FormField isSelected={isSelected} onSelectedChange={onSelectedChange}>
    <FormField.Content>
      <FormField.Title>{title}</FormField.Title>
      <FormField.Description>{description}</FormField.Description>
    </FormField.Content>
    <FormField.Indicator>
      <Switch />
    </FormField.Indicator>
  </FormField>
);

const DefaultContent = () => {
  const [fields, setFields] = React.useState({
    notifications: false,
    darkMode: false,
    autoUpdate: true,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string }
  > = {
    notifications: {
      title: 'Enable notifications',
      description: 'Receive push notifications about your account activity',
    },
    darkMode: {
      title: 'Dark mode',
      description: 'Switch between light and dark theme',
    },
    autoUpdate: {
      title: 'Auto-update',
      description: 'Automatically download and install updates',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <SwitchField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              title={fieldConfigs[key].title}
              description={fieldConfigs[key].description}
            />
          </React.Fragment>
        ))}
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const StatesContent = () => {
  const [fields, setFields] = React.useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string; disabled?: boolean }
  > = {
    emailNotifications: {
      title: 'Email notifications',
      description: 'Receive notifications via email',
    },
    pushNotifications: {
      title: 'Push notifications',
      description: 'This feature is currently unavailable',
      disabled: true,
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <FormField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              isDisabled={fieldConfigs[key].disabled}
            >
              <FormField.Content>
                <FormField.Title>{fieldConfigs[key].title}</FormField.Title>
                <FormField.Description>
                  {fieldConfigs[key].description}
                </FormField.Description>
              </FormField.Content>
              <FormField.Indicator>
                <Switch />
              </FormField.Indicator>
            </FormField>
          </React.Fragment>
        ))}
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylesContent = () => {
  const [icon, setIcon] = React.useState(true);
  const [contentIcon, setContentIcon] = React.useState(true);
  const [contentText, setContentText] = React.useState(true);

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-16 items-center">
        <Switch isSelected={icon} onSelectedChange={setIcon}>
          <Switch.Thumb>
            {icon ? (
              <Animated.View key="check" entering={ZoomIn}>
                <StyledIonicons
                  name="checkmark"
                  size={12}
                  className="text-accent"
                />
              </Animated.View>
            ) : (
              <Animated.View key="x" entering={ZoomIn}>
                <StyledIonicons
                  name="close"
                  size={14}
                  className="text-default"
                />
              </Animated.View>
            )}
          </Switch.Thumb>
        </Switch>

        <Switch
          isSelected={contentIcon}
          onSelectedChange={setContentIcon}
          className="w-[56px] h-[32px]"
          classNames={{
            contentPaddingContainer: 'px-1.5',
          }}
          colors={{
            defaultBackground: '#172554',
            selectedBackground: '#eab308',
            defaultBorder: '#dbeafe20',
            selectedBorder: '#eab308',
          }}
        >
          <Switch.Thumb
            width={22}
            colors={{
              defaultBackground: '#dbeafe',
              selectedBackground: '#854d0e',
            }}
            animationConfig={{
              translateX: {
                damping: 30,
                stiffness: 300,
                mass: 1,
              },
            }}
          />
          <Switch.StartContent className="left-0.5">
            {contentIcon && (
              <Animated.View key="sun" entering={ZoomIn.springify()}>
                <StyledIonicons
                  name="sunny"
                  size={16}
                  className="text-[#854d0e]"
                />
              </Animated.View>
            )}
          </Switch.StartContent>
          <Switch.EndContent className="right-0.5">
            {!contentIcon && (
              <Animated.View key="moon" entering={ZoomIn.springify()}>
                <StyledIonicons
                  name="moon"
                  size={16}
                  className="text-[#dbeafe]"
                />
              </Animated.View>
            )}
          </Switch.EndContent>
        </Switch>

        <Switch
          isSelected={contentText}
          onSelectedChange={setContentText}
          className="w-[60px] h-[32px]"
          classNames={{
            contentPaddingContainer: 'px-1.5',
          }}
          colors={{
            defaultBackground: '#71717a',
            selectedBackground: '#16a34a',
            defaultBorder: '#71717a',
            selectedBorder: '#16a34a',
          }}
        >
          <Switch.Thumb
            width={22}
            colors={{ defaultBackground: '#fff', selectedBackground: '#fff' }}
            animationConfig={{
              translateX: {
                damping: 36,
                stiffness: 400,
                mass: 1,
              },
            }}
          />
          <Switch.StartContent className="left-1">
            {contentText && (
              <Animated.View key="sun" entering={FadeInRight.springify()}>
                <AppText className="text-xs font-bold text-white">ON</AppText>
              </Animated.View>
            )}
          </Switch.StartContent>
          <Switch.EndContent className="right-0.5">
            {!contentText && (
              <Animated.View key="moon" entering={FadeInLeft.springify()}>
                <AppText className="text-xs font-bold text-zinc-200">
                  OFF
                </AppText>
              </Animated.View>
            )}
          </Switch.EndContent>
        </Switch>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SWITCH_VARIANTS: UsageVariant[] = [
  {
    value: 'default',
    label: 'Default',
    content: <DefaultContent />,
  },
  {
    value: 'states',
    label: 'States',
    content: <StatesContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom styles',
    content: <CustomStylesContent />,
  },
];

export default function SwitchScreen() {
  return <UsageVariantFlatList data={SWITCH_VARIANTS} />;
}
