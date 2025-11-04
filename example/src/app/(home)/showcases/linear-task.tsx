import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Avatar, Card, Divider } from 'heroui-native';
import { Pressable, View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { Assignee } from '../../../components/showcases/linear-task/dialogs/assignee';
import { Labels } from '../../../components/showcases/linear-task/dialogs/labels';
import { Priority } from '../../../components/showcases/linear-task/dialogs/priority';
import { Project } from '../../../components/showcases/linear-task/dialogs/project';
import { Status } from '../../../components/showcases/linear-task/dialogs/status';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);

KeyboardController.preload();

export default function LinearTaskScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <Animated.ScrollView
      entering={FadeIn.delay(100)}
      className="flex-1 bg-background px-6"
      style={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center gap-5 mb-4">
        <Pressable
          className="flex-row items-center gap-1"
          onPress={router.back}
        >
          <StyledMaterialCommunityIcons
            name="arrow-left"
            size={16}
            className="text-foreground"
          />
          <AppText className="text-lg font-medium text-foreground">
            Back
          </AppText>
        </Pressable>
        <AppText className="text-base font-medium text-muted">DEV-37</AppText>
      </View>

      <AppText className="text-2xl font-bold text-foreground mb-4">
        Modern Dialog Component with Adaptive Layouts and Accessibility
      </AppText>

      <Card
        variant="tertiary"
        className="flex-row flex-wrap gap-x-2 gap-y-3 border-0 rounded-3xl mb-6 -mx-3"
      >
        <Status />
        <Priority />
        <Assignee />
        <Labels />
        <Project />
      </Card>

      <AppText className="text-base text-foreground mb-6">
        Build a best-in-class dialog component that sets new standards for
        performance and user experience. The implementation should feature
        smooth animations, keyboard-aware positioning, and adaptive layouts that
        work seamlessly across all device sizes. Focus on creating an intuitive
        API that makes complex interactions feel effortless.
      </AppText>

      <Pressable onPress={simulatePress}>
        <Card className="mb-6 border-0 bg-surface-tertiary rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <StyledMaterialCommunityIcons
                name="github"
                size={20}
                className="text-foreground"
              />
              <AppText className="text-base font-semibold text-foreground">
                feat/dialog-component
              </AppText>
            </View>
            <View className="flex-row items-center gap-2">
              <AppText className="text-base text-muted">#26</AppText>
              <StyledMaterialCommunityIcons
                name="source-branch"
                size={20}
                className="text-purple-400"
              />
            </View>
          </View>
        </Card>
      </Pressable>

      <Divider className="mb-6 -mx-6" />

      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <AppText className="text-lg font-semibold text-muted">
            Activity
          </AppText>
          <View className="flex-row items-center">
            <View className="flex-row">
              <Avatar alt="volo" className="size-6 bg-purple-500">
                <Avatar.Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/volo-avatar.png',
                  }}
                />
                <Avatar.Fallback>
                  <AppText className="text-[10px] font-bold text-white">
                    VS
                  </AppText>
                </Avatar.Fallback>
              </Avatar>
              <Avatar alt="Junior" className="-ml-3 size-6 bg-sky-500">
                <Avatar.Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/junior-avatar.jpg',
                  }}
                />
                <Avatar.Fallback>
                  <AppText className="text-[10px] font-bold text-white">
                    JG
                  </AppText>
                </Avatar.Fallback>
              </Avatar>
            </View>
          </View>
        </View>

        <View>
          <View className="flex-row gap-2 -mb-1.5">
            <View className="items-center mt-1.5">
              <View className="size-2.5 rounded-full border border-foreground/60" />
              <View className="w-px h-12 bg-foreground/15" />
            </View>
            <View className="flex-1">
              <AppText className="text-base text-foreground/60">
                <AppText className="font-semibold text-foreground">
                  Junior
                </AppText>{' '}
                created the issue
              </AppText>
              <AppText className="text-sm text-foreground/35 mt-1">
                18 September 2025 at 13:32
              </AppText>
            </View>
          </View>

          <View className="flex-row gap-2 -mb-1.5">
            <View className="items-center mt-1.5">
              <View className="size-2.5 rounded-full border border-foreground/60" />
              <View className="w-px h-12 bg-foreground/15" />
            </View>
            <View className="flex-1">
              <AppText className="text-base text-foreground/60">
                <AppText className="font-semibold text-foreground">
                  volo
                </AppText>{' '}
                changed status from{' '}
                <AppText className="font-semibold text-foreground">
                  Todo
                </AppText>{' '}
                to{' '}
                <AppText className="font-semibold text-foreground">
                  In Progress
                </AppText>
              </AppText>
            </View>
          </View>

          <View className="flex-row gap-2 -mb-1.5">
            <View className="items-center mt-1.5">
              <View className="size-2.5 rounded-full border border-foreground/60" />
              <View className="w-px h-12 bg-foreground/15" />
            </View>
            <View className="flex-1">
              <AppText className="text-base text-foreground/60">
                <AppText className="font-semibold text-foreground">
                  volo
                </AppText>{' '}
                changed status from{' '}
                <AppText className="font-semibold text-foreground">
                  In Progress
                </AppText>{' '}
                to{' '}
                <AppText className="font-semibold text-foreground">
                  In Review
                </AppText>
              </AppText>
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="items-center mt-1.5">
              <View className="size-2.5 rounded-full border border-foreground/60" />
            </View>
            <View className="flex-1">
              <AppText className="text-base text-foreground/60">
                <AppText className="font-semibold text-foreground">
                  Junior
                </AppText>{' '}
                changed status from{' '}
                <AppText className="font-semibold text-foreground">
                  In Review
                </AppText>{' '}
                to{' '}
                <AppText className="font-semibold text-foreground">
                  Done
                </AppText>
              </AppText>
              <AppText className="text-sm text-foreground/35 mt-1">
                20 September 2025 at 11:54
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
}
