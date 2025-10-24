import {
  Button,
  Checkbox,
  cn,
  FormField,
  RadioGroup,
  Switch,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

const DURATION = 200;

const AnimatedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Animated.View
    entering={FadeIn.duration(DURATION)}
    exiting={FadeOut.duration(DURATION)}
    className="gap-6"
  >
    {children}
  </Animated.View>
);

interface FormErrors {
  name?: string;
  username?: string;
}

export default function TabsScreen() {
  const [activeTab, setActiveTab] = useState('general');
  const [variant, setVariant] = useState<'pill' | 'line'>('pill');

  // General Tab State
  const [homepage] = useState('heroui.com');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);

  // Appearance Tab State
  const [theme, setTheme] = useState('auto');
  const [fontSize, setFontSize] = useState('medium');

  // Notifications Tab State
  const [accountActivity, setAccountActivity] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [directMessages, setDirectMessages] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);

  // Profile Tab State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const insets = useSafeAreaInsets();

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
      // Profile update logic here
      console.log('Profile updated:', { name, username });
    }
  };

  return (
    <>
      <ScreenScrollView>
        <View className="h-6" />
        <Tabs
          variant={variant}
          value={activeTab}
          onValueChange={setActiveTab}
          className={cn('gap-1.5', variant === 'line' && 'gap-0')}
        >
          <Tabs.List className="border-b-0">
            <Tabs.ScrollView contentContainerClassName="gap-4">
              <Tabs.Indicator />
              <Tabs.Trigger value="general">
                <Tabs.Label>General</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="appearance">
                <Tabs.Label>Appearance</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="notifications">
                <Tabs.Label>Notifications</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="profile">
                <Tabs.Label>Profile</Tabs.Label>
              </Tabs.Trigger>
            </Tabs.ScrollView>
          </Tabs.List>
          <Animated.View
            layout={LinearTransition.duration(DURATION)}
            className={cn(
              'px-4 py-6 border border-border rounded-xl',
              variant === 'line' && 'rounded-lg'
            )}
            style={styles.borderCurve}
          >
            {/* General Tab Content */}
            <Tabs.Content value="general">
              <AnimatedContentContainer>
                {/* Homepage Field */}
                <TextField>
                  <TextField.Label>Homepage</TextField.Label>
                  <TextField.Input value={homepage} />
                </TextField>

                {/* Show Sidebar Checkbox */}
                <FormField
                  isSelected={showSidebar}
                  onSelectedChange={setShowSidebar}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Show sidebar</FormField.Title>
                    <FormField.Description>
                      Display the sidebar navigation panel
                    </FormField.Description>
                  </FormField.Content>
                </FormField>

                {/* Show Status Bar Checkbox */}
                <FormField
                  isSelected={showStatusBar}
                  onSelectedChange={setShowStatusBar}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Show status bar</FormField.Title>
                    <FormField.Description>
                      Display the status bar at the bottom
                    </FormField.Description>
                  </FormField.Content>
                </FormField>
              </AnimatedContentContainer>
            </Tabs.Content>

            {/* Appearance Tab Content */}
            <Tabs.Content value="appearance">
              <AnimatedContentContainer>
                {/* Theme Radio Group */}
                <RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="mb-6"
                >
                  <View className="mb-2">
                    <FormField.Title>Theme</FormField.Title>
                    <FormField.Description>
                      Select your preferred color theme
                    </FormField.Description>
                  </View>
                  <View className="gap-3">
                    <RadioGroup.Item value="auto" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Auto</RadioGroup.Title>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="light" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Light</RadioGroup.Title>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="dark" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Dark</RadioGroup.Title>
                    </RadioGroup.Item>
                  </View>
                </RadioGroup>

                {/* Font Size Radio Group */}
                <RadioGroup value={fontSize} onValueChange={setFontSize}>
                  <View className="mb-2">
                    <FormField.Title>Font Size</FormField.Title>
                    <FormField.Description>
                      Adjust the text size throughout the app
                    </FormField.Description>
                  </View>
                  <View className="gap-3">
                    <RadioGroup.Item value="small" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Small</RadioGroup.Title>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="medium" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Medium</RadioGroup.Title>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="large" className="self-start">
                      <RadioGroup.Indicator />
                      <RadioGroup.Title>Large</RadioGroup.Title>
                    </RadioGroup.Item>
                  </View>
                </RadioGroup>
              </AnimatedContentContainer>
            </Tabs.Content>

            {/* Notifications Tab Content */}
            <Tabs.Content value="notifications">
              <AnimatedContentContainer>
                {/* Account Activity Checkbox */}
                <FormField
                  isSelected={accountActivity}
                  onSelectedChange={setAccountActivity}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Account activity</FormField.Title>
                    <FormField.Description>
                      Notifications about your account activity
                    </FormField.Description>
                  </FormField.Content>
                </FormField>

                {/* Mentions Checkbox */}
                <FormField
                  isSelected={mentions}
                  onSelectedChange={setMentions}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Mentions</FormField.Title>
                    <FormField.Description>
                      When someone mentions you in a comment
                    </FormField.Description>
                  </FormField.Content>
                </FormField>

                {/* Direct Messages Checkbox */}
                <FormField
                  isSelected={directMessages}
                  onSelectedChange={setDirectMessages}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Direct messages</FormField.Title>
                    <FormField.Description>
                      Notifications for new direct messages
                    </FormField.Description>
                  </FormField.Content>
                </FormField>

                {/* Marketing Email Checkbox */}
                <FormField
                  isSelected={marketingEmail}
                  onSelectedChange={setMarketingEmail}
                  alignIndicator="start"
                >
                  <FormField.Indicator>
                    <Checkbox />
                  </FormField.Indicator>
                  <FormField.Content>
                    <FormField.Title>Marketing email</FormField.Title>
                    <FormField.Description>
                      Receive emails about new features and updates
                    </FormField.Description>
                  </FormField.Content>
                </FormField>
              </AnimatedContentContainer>
            </Tabs.Content>

            {/* Profile Tab Content */}
            <Tabs.Content value="profile">
              <AnimatedContentContainer>
                {/* Name Field */}
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

                {/* Username Field */}
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
                  <TextField.ErrorMessage>
                    {errors.username}
                  </TextField.ErrorMessage>
                </TextField>

                {/* Update Profile Button */}
                <Button
                  size="sm"
                  className="self-start px-6"
                  onPress={handleUpdateProfile}
                >
                  <Button.Label className="text-base">
                    Update profile
                  </Button.Label>
                </Button>
              </AnimatedContentContainer>
            </Tabs.Content>
          </Animated.View>
        </Tabs>
      </ScreenScrollView>

      <View
        className="absolute left-8 right-8"
        style={{
          bottom: insets.bottom + 40,
        }}
      >
        <FormField
          isSelected={variant === 'line'}
          onSelectedChange={(selected) =>
            setVariant(selected ? 'line' : 'pill')
          }
        >
          <FormField.Content>
            <FormField.Title>Tabs variant</FormField.Title>
            <FormField.Description>
              Toggle between pill and line variants
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
