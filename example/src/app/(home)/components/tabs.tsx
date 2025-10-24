import { Chip, Tabs } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

export default function TabsScreen() {
  const [tab1, setTab1] = useState('one');
  const [tab2, setTab2] = useState('profile');
  const [tab3, setTab3] = useState('home');

  return (
    <ScreenScrollView>
      <AppText className="text-lg font-bold text-muted-foreground mb-4">
        Basic Tabs
      </AppText>

      <Tabs value={tab1} onValueChange={setTab1} className="mb-6">
        <Tabs.List isScrollable>
          <Tabs.Indicator />
          {['one', 'two', 'three', 'four', 'five', 'six'].map((value) => (
            <Tabs.Trigger key={value} value={value} className="px-12">
              <Tabs.Label>{value}</Tabs.Label>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {['one', 'two', 'three', 'four', 'five', 'six'].map((value) => (
          <Tabs.Content key={value} value={value}>
            <Animated.View
              entering={FadeInDown}
              className="px-2 py-4 gap-2 bg-panel rounded-lg"
            >
              <Chip>{value}</Chip>
              <AppText className="text-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                alias illum vitae unde rem ut laboriosam molestiae tenetur
                ratione eum culpa nostrum ullam eius vero, consequatur quo?
                Officiis, doloribus ratione.
              </AppText>
            </Animated.View>
          </Tabs.Content>
        ))}
      </Tabs>

      <AppText className="text-lg font-bold text-muted-foreground mb-4">
        Multiple Tabs
      </AppText>

      <Tabs
        variant="line"
        value={tab2}
        onValueChange={setTab2}
        className="mb-6"
      >
        <Tabs.List className="mr-0 w-full">
          <Tabs.Indicator />
          <Tabs.Trigger value="profile" className="flex-1">
            <Tabs.Label>Profile</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="settings" className="flex-1">
            <Tabs.Label>Settings</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications" className="flex-1">
            <Tabs.Label>Notifications</Tabs.Label>
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
        <Tabs.List className="rounded-xl">
          <Tabs.Indicator
            className="rounded-[14px]"
            animationConfig={{
              type: 'spring',
              config: { stiffness: 1200, damping: 100 },
            }}
          />
          <Tabs.Trigger value="home" className="py-3 px-6">
            <Tabs.Label>Home</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="disabled" isDisabled>
            <Tabs.Label>Disabled</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="about" className="py-3 px-6">
            <Tabs.Label>About</Tabs.Label>
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
    </ScreenScrollView>
  );
}
