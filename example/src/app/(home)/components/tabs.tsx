import { Tabs } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppText } from '../../../components/app-text';

export default function TabsScreen() {
  const [tab1, setTab1] = useState('account');
  const [tab2, setTab2] = useState('profile');
  const [tab3, setTab3] = useState('home');

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <AppText className="text-lg font-bold text-muted-foreground mb-4">
        Basic Tabs
      </AppText>

      <Tabs value={tab1} onValueChange={setTab1} className="mb-6">
        <Tabs.List>
          <Tabs.Trigger value="account">
            <AppText className="text-sm font-medium text-foreground">
              Account
            </AppText>
          </Tabs.Trigger>
          <Tabs.Trigger value="password">
            <AppText className="text-sm font-medium text-foreground">
              Password
            </AppText>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="account">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Make changes to your account here.
            </AppText>
          </View>
        </Tabs.Content>

        <Tabs.Content value="password">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Change your password here.
            </AppText>
          </View>
        </Tabs.Content>
      </Tabs>

      <AppText className="text-lg font-bold text-muted-foreground mb-4">
        Multiple Tabs
      </AppText>

      <Tabs value={tab2} onValueChange={setTab2} className="mb-6">
        <Tabs.List>
          <Tabs.Trigger value="profile">
            <AppText className="text-sm font-medium text-foreground">
              Profile
            </AppText>
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <AppText className="text-sm font-medium text-foreground">
              Settings
            </AppText>
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications">
            <AppText className="text-sm font-medium text-foreground">
              Notifications
            </AppText>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Your profile information appears here.
            </AppText>
          </View>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Adjust your settings here.
            </AppText>
          </View>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Manage your notifications here.
            </AppText>
          </View>
        </Tabs.Content>
      </Tabs>

      <AppText className="text-lg font-bold text-muted-foreground mb-4">
        Disabled State
      </AppText>

      <Tabs value={tab3} onValueChange={setTab3} className="mb-6">
        <Tabs.List>
          <Tabs.Trigger value="home">
            <AppText className="text-sm font-medium text-foreground">
              Home
            </AppText>
          </Tabs.Trigger>
          <Tabs.Trigger value="disabled" isDisabled>
            <AppText className="text-sm font-medium text-foreground">
              Disabled
            </AppText>
          </Tabs.Trigger>
          <Tabs.Trigger value="about">
            <AppText className="text-sm font-medium text-foreground">
              About
            </AppText>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="home">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              Welcome to the home tab.
            </AppText>
          </View>
        </Tabs.Content>

        <Tabs.Content value="disabled">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              This content is disabled.
            </AppText>
          </View>
        </Tabs.Content>

        <Tabs.Content value="about">
          <View className="p-4 bg-panel rounded-lg">
            <AppText className="text-foreground">
              About section content.
            </AppText>
          </View>
        </Tabs.Content>
      </Tabs>
    </ScrollView>
  );
}
