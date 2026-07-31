import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import {
  Button,
  cn,
  ControlField,
  Description,
  FieldError,
  Input,
  Label,
  Radio,
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
import useHeaderHeight from '../../../helpers/hooks/use-header-height';

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
  variant: 'primary' | 'secondary';
}

interface TabTriggerProps {
  value: string;
  label: string;
}

const TabTrigger = ({ value, label }: TabTriggerProps) => {
  return (
    <Tabs.Trigger value={value}>
      <Tabs.Label>{label}</Tabs.Label>
    </Tabs.Trigger>
  );
};

const TabsContent = ({ variant }: TabsContentProps) => {
  const { t } = useLingui();
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
      newErrors.name = t`Name is required`;
    }

    if (!username.trim()) {
      newErrors.username = t`Username is required`;
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username = t`Username must be 3-20 characters (letters, numbers, underscore only)`;
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
      className={cn('gap-1.5', variant === 'secondary' && 'gap-0')}
    >
      <Tabs.List
        className={cn('border-b-0', variant === 'secondary' && 'mx-4')}
      >
        <Tabs.ScrollView contentContainerClassName="gap-1">
          <Tabs.Indicator />
          <TabTrigger value="general" label={t`General`} />
          <TabTrigger value="appearance" label={t`Appearance`} />
          <TabTrigger value="notifications" label={t`Notifications`} />
          <TabTrigger value="profile" label={t`Profile`} />
        </Tabs.ScrollView>
      </Tabs.List>
      <StyleAnimatedView
        layout={LinearTransition.duration(DURATION)}
        className={cn(
          'px-2 py-6',
          variant === 'secondary' &&
            'px-5 border border-foreground/10 rounded-2xl'
        )}
        style={styles.borderCurve}
      >
        <Tabs.Content value="general">
          <AnimatedContentContainer>
            <TextField>
              <Label>
                <Label.Text maxFontSizeMultiplier={1.4}>
                  {t`Homepage`}
                </Label.Text>
              </Label>
              <Input value={homepage} maxFontSizeMultiplier={1.4} />
            </TextField>

            <ControlField
              isSelected={showSidebar}
              onSelectedChange={setShowSidebar}
            >
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Show sidebar`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Display the sidebar navigation panel`}
                </Description>
              </View>
            </ControlField>

            {/* Show Status Bar Checkbox */}
            <ControlField
              isSelected={showStatusBar}
              onSelectedChange={setShowStatusBar}
            >
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Show status bar`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Display the status bar at the bottom`}
                </Description>
              </View>
            </ControlField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="appearance">
          <AnimatedContentContainer>
            <RadioGroup value={theme} onValueChange={setTheme} className="mb-6">
              <View className="mb-2">
                <Label>
                  <Label.Text
                    maxFontSizeMultiplier={1.4}
                  >{t`Theme`}</Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Select your preferred color theme`}
                </Description>
              </View>
              <View className="gap-3">
                <RadioGroup.Item value="auto" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Auto`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="light" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Light`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="dark" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Dark`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
              </View>
            </RadioGroup>

            <RadioGroup value={fontSize} onValueChange={setFontSize}>
              <View className="mb-2">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Font Size`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Adjust the text size throughout the app`}
                </Description>
              </View>
              <View className="gap-3">
                <RadioGroup.Item value="small" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Small`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="medium" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Medium`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
                <RadioGroup.Item value="large" className="self-start">
                  <Radio />
                  <Label>
                    <Label.Text maxFontSizeMultiplier={1.4}>
                      {t`Large`}
                    </Label.Text>
                  </Label>
                </RadioGroup.Item>
              </View>
            </RadioGroup>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <AnimatedContentContainer>
            <ControlField
              isSelected={accountActivity}
              onSelectedChange={setAccountActivity}
            >
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Account activity`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Notifications about your account activity`}
                </Description>
              </View>
            </ControlField>

            <ControlField isSelected={mentions} onSelectedChange={setMentions}>
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Mentions`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`When someone mentions you in a comment`}
                </Description>
              </View>
            </ControlField>

            <ControlField
              isSelected={directMessages}
              onSelectedChange={setDirectMessages}
            >
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Direct messages`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Notifications for new direct messages`}
                </Description>
              </View>
            </ControlField>

            <ControlField
              isSelected={marketingEmail}
              onSelectedChange={setMarketingEmail}
            >
              <ControlField.Indicator variant="checkbox" />
              <View className="flex-1">
                <Label>
                  <Label.Text maxFontSizeMultiplier={1.4}>
                    {t`Marketing email`}
                  </Label.Text>
                </Label>
                <Description maxFontSizeMultiplier={1.4}>
                  {t`Receive emails about new features and updates`}
                </Description>
              </View>
            </ControlField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <AnimatedContentContainer>
            <TextField isRequired isInvalid={!!errors.name}>
              <Label>
                <Label.Text maxFontSizeMultiplier={1.4}>{t`Name`}</Label.Text>
              </Label>
              <Input
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder={t`Enter your full name`}
              />
              <FieldError>{errors.name}</FieldError>
            </TextField>

            <TextField isRequired isInvalid={!!errors.username}>
              <Label>
                <Label.Text maxFontSizeMultiplier={1.4}>
                  {t`Username`}
                </Label.Text>
              </Label>
              <Input
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
                placeholder={t`Enter username`}
                autoCapitalize="none"
              />
              <Description hideOnInvalid maxFontSizeMultiplier={1.4}>
                {t`3-20 characters, letters, numbers only`}
              </Description>
              <FieldError>{errors.username}</FieldError>
            </TextField>

            <Button
              variant="secondary"
              size="sm"
              className="self-start px-6"
              onPress={handleUpdateProfile}
            >
              <Button.Label className="text-base" maxFontSizeMultiplier={1.4}>
                {t`Update profile`}
              </Button.Label>
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
      <TabsContent variant="primary" />
    </View>
  );
};

// ------------------------------------------------------------------------------

const LineVariantContent = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1 px-5" style={{ paddingTop: headerHeight + 20 }}>
      <TabsContent variant="secondary" />
    </View>
  );
};

// ------------------------------------------------------------------------------

const TABS_VARIANTS: UsageVariant[] = [
  {
    value: 'primary-variant',
    label: msg`Primary variant`,
    content: <PillVariantContent />,
  },
  {
    value: 'secondary-variant',
    label: msg`Secondary variant`,
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
