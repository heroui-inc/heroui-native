import { useHeaderHeight } from '@react-navigation/elements';
import {
  Button,
  cn,
  FormField,
  RadioGroup,
  Tabs,
  TextField,
} from 'heroui-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyleAnimatedView = withUniwind(Animated.View);

const DURATION = 200;

const AnimatedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StyleAnimatedView
    entering={FadeIn.duration(DURATION)}
    exiting={FadeOut.duration(DURATION)}
    className="gap-6"
  >
    {children}
  </StyleAnimatedView>
);

interface FormErrors {
  name?: string;
  username?: string;
}

interface TabsContentProps {
  variant: 'pill' | 'line';
}

interface TabTriggerProps {
  value: string;
  label: string;
}

const TabTrigger = ({ value, label }: TabTriggerProps) => {
  return (
    <Tabs.Trigger value={value}>
      {({ isSelected }) => (
        <Tabs.Label
          className={cn(
            isSelected ? 'text-accent font-medium' : 'text-foreground'
          )}
        >
          {label}
        </Tabs.Label>
      )}
    </Tabs.Trigger>
  );
};

const TabsContent = ({ variant }: TabsContentProps) => {
  const [activeTab, setActiveTab] = useState('general');

  const [homepage] = useState('heroui.com');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);

  const [theme, setTheme] = useState('auto');
  const [fontSize, setFontSize] = useState('medium');

  const [accountActivity, setAccountActivity] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [directMessages, setDirectMessages] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateProfile = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username =
        'Username must be 3-20 characters (letters, numbers, underscore only)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = () => {
    if (validateProfile()) {
      console.log('Profile updated:', { name, username });
    }
  };

  return (
    <Tabs
      variant={variant}
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn('gap-1.5', variant === 'line' && 'gap-0')}
    >
      <Tabs.List className={cn('border-b-0', variant === 'line' && 'mx-4')}>
        <Tabs.ScrollView
          contentContainerClassName={cn('gap-4', variant === 'line' && 'px-0')}
        >
          <Tabs.Indicator />
          <TabTrigger value="general" label="General" />
          <TabTrigger value="appearance" label="Appearance" />
          <TabTrigger value="notifications" label="Notifications" />
          <TabTrigger value="profile" label="Profile" />
        </Tabs.ScrollView>
      </Tabs.List>
      <StyleAnimatedView
        layout={LinearTransition.duration(DURATION)}
        className={cn(
          'px-2 py-6',
          variant === 'line' && 'px-5 border border-foreground/10 rounded-2xl'
        )}
        style={styles.borderCurve}
      >
        <Tabs.Content value="general">
          <AnimatedContentContainer>
            <TextField>
              <TextField.Label>Homepage</TextField.Label>
              <TextField.Input value={homepage} />
            </TextField>

            <FormField
              isSelected={showSidebar}
              onSelectedChange={setShowSidebar}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Show sidebar</FormField.Label>
                <FormField.Description>
                  Display the sidebar navigation panel
                </FormField.Description>
              </View>
            </FormField>

            {/* Show Status Bar Checkbox */}
            <FormField
              isSelected={showStatusBar}
              onSelectedChange={setShowStatusBar}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Show status bar</FormField.Label>
                <FormField.Description>
                  Display the status bar at the bottom
                </FormField.Description>
              </View>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="appearance">
          <AnimatedContentContainer>
            <RadioGroup value={theme} onValueChange={setTheme} className="mb-6">
              <View className="mb-2">
                <FormField.Label>Theme</FormField.Label>
                <FormField.Description>
                  Select your preferred color theme
                </FormField.Description>
              </View>
              <View className="gap-3">
                <RadioGroup.Item value="auto" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Auto</RadioGroup.Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="light" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Light</RadioGroup.Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="dark" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Dark</RadioGroup.Label>
                </RadioGroup.Item>
              </View>
            </RadioGroup>

            <RadioGroup value={fontSize} onValueChange={setFontSize}>
              <View className="mb-2">
                <FormField.Label>Font Size</FormField.Label>
                <FormField.Description>
                  Adjust the text size throughout the app
                </FormField.Description>
              </View>
              <View className="gap-3">
                <RadioGroup.Item value="small" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Small</RadioGroup.Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="medium" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Medium</RadioGroup.Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="large" className="self-start">
                  <RadioGroup.Indicator />
                  <RadioGroup.Label>Large</RadioGroup.Label>
                </RadioGroup.Item>
              </View>
            </RadioGroup>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <AnimatedContentContainer>
            <FormField
              isSelected={accountActivity}
              onSelectedChange={setAccountActivity}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Account activity</FormField.Label>
                <FormField.Description>
                  Notifications about your account activity
                </FormField.Description>
              </View>
            </FormField>

            <FormField isSelected={mentions} onSelectedChange={setMentions}>
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Mentions</FormField.Label>
                <FormField.Description>
                  When someone mentions you in a comment
                </FormField.Description>
              </View>
            </FormField>

            <FormField
              isSelected={directMessages}
              onSelectedChange={setDirectMessages}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Direct messages</FormField.Label>
                <FormField.Description>
                  Notifications for new direct messages
                </FormField.Description>
              </View>
            </FormField>

            <FormField
              isSelected={marketingEmail}
              onSelectedChange={setMarketingEmail}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Marketing email</FormField.Label>
                <FormField.Description>
                  Receive emails about new features and updates
                </FormField.Description>
              </View>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <AnimatedContentContainer>
            <TextField isRequired isInvalid={!!errors.name}>
              <TextField.Label>Name</TextField.Label>
              <TextField.Input
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder="Enter your full name"
              />
              <TextField.ErrorMessage>{errors.name}</TextField.ErrorMessage>
            </TextField>

            <TextField isRequired isInvalid={!!errors.username}>
              <TextField.Label>Username</TextField.Label>
              <TextField.Input
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
                placeholder="Enter username"
                autoCapitalize="none"
              />
              <TextField.Description>
                3-20 characters, letters, numbers, and underscore only
              </TextField.Description>
              <TextField.ErrorMessage>{errors.username}</TextField.ErrorMessage>
            </TextField>

            <Button
              variant="secondary"
              size="sm"
              className="self-start px-6"
              onPress={handleUpdateProfile}
            >
              <Button.Label className="text-base">Update profile</Button.Label>
            </Button>
          </AnimatedContentContainer>
        </Tabs.Content>
      </StyleAnimatedView>
    </Tabs>
  );
};

const PillVariantContent = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1 px-5" style={{ paddingTop: headerHeight + 20 }}>
      <TabsContent variant="pill" />
    </View>
  );
};

// ------------------------------------------------------------------------------

const LineVariantContent = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1 px-5" style={{ paddingTop: headerHeight + 20 }}>
      <TabsContent variant="line" />
    </View>
  );
};

// ------------------------------------------------------------------------------

const TABS_VARIANTS: UsageVariant[] = [
  {
    value: 'pill-variant',
    label: 'Pill variant',
    content: <PillVariantContent />,
  },
  {
    value: 'line-variant',
    label: 'Line variant',
    content: <LineVariantContent />,
  },
];

export default function TabsScreen() {
  return <UsageVariantFlatList data={TABS_VARIANTS} />;
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
