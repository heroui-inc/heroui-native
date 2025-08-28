/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, useTheme } from 'heroui-native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function CardScreen() {
  const { colors } = useTheme();

  const { width } = useWindowDimensions();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Card" />
      <Card>
        <Card.Details>
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>
                Living room Sofa <AppText className="text-sm">✦</AppText>{' '}
                Collection 2025
              </Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.LabelContent>Add to cart</Button.LabelContent>
              <Button.EndContent>
                <Ionicons
                  name="basket-outline"
                  size={16}
                  color={colors.mutedForeground}
                />
              </Button.EndContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
      <Card>
        <Card.Details>
          <Card.Header>
            <View className="bg-accent rounded-full w-12 h-12 items-center justify-center">
              <AppText className="text-accent-foreground font-bold text-xl">
                $
              </AppText>
            </View>
          </Card.Header>
          <Card.Body>
            <Card.Title>Premium Plan</Card.Title>
            <Card.Description className="mb-4">
              Get access to all premium features and priority support.
            </Card.Description>
            <AppText className="text-2xl font-bold text-foreground">
              $29.99/month
            </AppText>
          </Card.Body>
          <Card.Footer>
            <Button>
              <Button.LabelContent>Subscribe Now</Button.LabelContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>

      <SectionTitle title="Card with Image" />
      <View className="flex-row gap-4">
        <Card surfaceVariant="2" className="flex-1 rounded-xl">
          <Card.Details>
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/robot1.jpg',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>Indie Hackers</Card.Title>
              <Card.Description className="mb-4">148 members</Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="w-4 h-4 rounded-full bg-rose-400" />
              <AppText className="text-sm font-medium text-foreground">
                @indiehackers
              </AppText>
            </Card.Footer>
          </Card.Details>
        </Card>
        <Card surfaceVariant="2" className="flex-1 rounded-xl">
          <Card.Details>
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/components-card-robot.png',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>AI Builders</Card.Title>
              <Card.Description className="mb-4">362 members</Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="w-4 h-4 rounded-full bg-emerald-400" />
              <AppText className="text-sm font-medium text-foreground">
                @aibuilders
              </AppText>
            </Card.Footer>
          </Card.Details>
        </Card>
      </View>

      <SectionTitle title="Horizontal Card With Image" />
      <View className="gap-8">
        <Card className="flex-row rounded-xl gap-4 p-4" surfaceVariant="2">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/robot2.jpg',
            }}
            style={{
              height: 110,
              aspectRatio: 1,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Card.Details>
            <Card.Body className="mb-2">
              <Card.Title className="mb-1">Bringing the future</Card.Title>
              <Card.Description numberOfLines={2}>
                Today, 6:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText className="text-sm font-medium text-foreground">
                  View Details
                </AppText>
                <Ionicons
                  name="open-outline"
                  size={12}
                  color={colors.foreground}
                />
              </Pressable>
            </Card.Footer>
          </Card.Details>
        </Card>
        <Card className="flex-row rounded-xl gap-4 p-4" surfaceVariant="2">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
            }}
            style={{
              height: 110,
              aspectRatio: 1,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Card.Details>
            <Card.Body className="mb-2">
              <Card.Title className="mb-1">Marketing Conf</Card.Title>
              <Card.Description numberOfLines={2}>
                Wed, 4:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText className="text-sm font-medium text-foreground">
                  View Details
                </AppText>
                <Ionicons
                  name="open-outline"
                  size={12}
                  color={colors.foreground}
                />
              </Pressable>
            </Card.Footer>
          </Card.Details>
        </Card>
      </View>

      <SectionTitle title="Background Image Card" />
      <Card className="aspect-square rounded-2xl">
        <Image
          source={{
            uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/dog1.jpg',
          }}
          className="absolute inset-0"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <Card.Details className="justify-end h-full">
          <Card.Body>
            <Card.Title className="text-base text-white uppercase mb-0.5">
              Pet health
            </Card.Title>
            <Card.Description className="text-neutral-200 font-semibold text-lg">
              Your pet deserve the best
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <AppText className="text-lg text-white">Available soon</AppText>
                <AppText className="text-base font-medium text-neutral-400">
                  Get notified
                </AppText>
              </View>
              <Button variant="primary" size="sm" className="bg-white">
                <Button.LabelContent classNames={{ text: 'text-black' }}>
                  Notify me
                </Button.LabelContent>
              </Button>
            </View>
          </Card.Footer>
        </Card.Details>
      </Card>

      <SectionTitle title="Profile Onboarding Cards" />
      <ScrollView
        horizontal
        className="-mx-5"
        contentContainerClassName="gap-2 px-5"
        showsHorizontalScrollIndicator={false}
      >
        <Card
          surfaceVariant="2"
          style={{ width: width / 1.6 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Ionicons
                  name="people-outline"
                  size={20}
                  color={colors.foreground}
                />
              </View>
              <Card.Title className="text-center">
                Follow 10 profiles
              </Card.Title>
              <Card.Description className="text-center">
                Fill your feed with threads that interest you.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button size="sm">
                <Button.LabelContent>See profiles</Button.LabelContent>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>

        <Card
          surfaceVariant="2"
          style={{ width: width / 1.5 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Ionicons
                  name="checkmark"
                  size={28}
                  color={colors.foreground}
                />
              </View>
              <Card.Title className="text-center">Create thread</Card.Title>
              <Card.Description className="text-center">
                Say what's on your mind or share a recent highlight.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button
                size="sm"
                variant="ghost"
                className="border border-muted-foreground/50"
              >
                <Button.LabelContent>Done</Button.LabelContent>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>

        <Card
          surfaceVariant="2"
          style={{ width: width / 1.5 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Ionicons
                  name="checkmark"
                  size={28}
                  color={colors.foreground}
                />
              </View>
              <Card.Title className="text-center">Add profile photo</Card.Title>
              <Card.Description className="text-center">
                Make it easier for people to recognize you.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button
                size="sm"
                variant="ghost"
                className="border border-muted-foreground/50"
              >
                <Button.LabelContent>Done</Button.LabelContent>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>
      </ScrollView>

      <SectionTitle title="Surface Variants" />

      <View className="gap-8">
        <Card surfaceVariant="none">
          <Card.Details>
            <Card.Body>
              <Card.Title>Transparent Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="none" for a transparent
                background.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="1">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 1 Card</Card.Title>
              <Card.Description>
                This is the default card appearance with surfaceVariant="1".
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="2">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 2 Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="2" for a different surface color.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="3">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 3 Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="3" for the deepest surface color.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>
      </View>
    </ScreenScrollView>
  );
}
