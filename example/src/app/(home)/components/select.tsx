import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Select, useTheme } from 'heroui-native';
import { Platform, Text, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function PopoverScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      {/* Basic Select */}
      <SectionTitle title="Basic Usage" />
      <View className="items-center">
        <Select>
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm">
              Open Select
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content>
              <AppText className="text-foreground">
                This is a basic select with simple content
              </AppText>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* With Title and Description */}
      <SectionTitle title="With Title & Description" />
      <View className="items-center">
        <Select>
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm">
              <Ionicons
                name="information-circle"
                size={20}
                color={colors.mutedForeground}
              />
              <Button.Label>Show Info</Button.Label>
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content className="gap-1 w-[320px] rounded-xl px-6 py-4">
              <Select.Close className="absolute top-3 right-3 z-50" />
              <Select.Title>Information</Select.Title>
              <Select.Description>
                This select includes a title and description to provide more
                structured information to users.
              </Select.Description>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Controlled State */}
      <SectionTitle title="Presentation" />
      <View className="flex-row items-center justify-center gap-4">
        <Select>
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm">
              Select
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              className="gap-2 w-[280px] items-center"
              presentation="popover"
            >
              <View className="mb-6 items-center">
                <Text className="text-5xl">💥</Text>
                <Select.Title>Boom</Select.Title>
                <Select.Description className="text-center">
                  This select uses the popover presentation.
                </Select.Description>
              </View>
              <Select.Close asChild>
                <Button size="sm" className="self-stretch">
                  Close Select
                </Button>
              </Select.Close>
            </Select.Content>
          </Select.Portal>
        </Select>
        <Select>
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm">
              Bottom Sheet
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay className="bg-black/30" />
            <Select.Content presentation="bottom-sheet">
              <View className="items-center">
                <Text className="text-5xl">🎇</Text>
                <Select.Title>Badaboom</Select.Title>
                <Select.Description className="mb-8 text-center">
                  This select uses the bottom sheet presentation.
                </Select.Description>
                <Select.Close asChild>
                  <Button className="self-stretch">Close Bottom Sheet</Button>
                </Select.Close>
              </View>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Placements */}
      <SectionTitle title="Placement Options" />
      <View className="gap-4">
        <View className="flex-row justify-between gap-4">
          <Select>
            <Select.Trigger asChild>
              <Button size="sm" variant="tertiary" className="w-24">
                Top
              </Button>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay />
              <Select.Content placement="top">
                <AppText className="text-foreground">Top placement</AppText>
              </Select.Content>
            </Select.Portal>
          </Select>

          <Select>
            <Select.Trigger asChild>
              <Button size="sm" variant="tertiary" className="w-24">
                Left
              </Button>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay />
              <Select.Content placement="left">
                <AppText className="text-foreground">Left Placement</AppText>
              </Select.Content>
            </Select.Portal>
          </Select>
        </View>

        <View className="flex-row justify-between gap-4">
          <Select>
            <Select.Trigger asChild>
              <Button size="sm" variant="tertiary" className="w-24">
                Right
              </Button>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay />
              <Select.Content placement="right">
                <AppText className="text-foreground">Right placement</AppText>
              </Select.Content>
            </Select.Portal>
          </Select>

          <Select>
            <Select.Trigger asChild>
              <Button size="sm" variant="tertiary" className="w-24">
                Bottom
              </Button>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay />
              <Select.Content placement="bottom">
                <AppText className="text-foreground">Bottom placement</AppText>
              </Select.Content>
            </Select.Portal>
          </Select>
        </View>
      </View>

      {/* Alignment Options */}
      <SectionTitle title="Alignment Options" />
      <View className="flex-row justify-center gap-4">
        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              Start
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content placement="top" align="start">
              <AppText className="text-foreground">Start aligned</AppText>
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              Center
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content placement="top" align="center">
              <AppText className="text-foreground">Center aligned</AppText>
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              End
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content placement="top" align="end">
              <AppText className="text-foreground">End aligned</AppText>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Native Modal Navigation */}
      {Platform.OS === 'ios' && (
        <>
          <SectionTitle title="Native Modal Test" />
          <View className="items-center">
            <Button
              variant="tertiary"
              size="sm"
              onPress={() => router.push('components/select-native-modal')}
            >
              Select from Native Modal
            </Button>
          </View>
        </>
      )}
    </ScreenScrollView>
  );
}
