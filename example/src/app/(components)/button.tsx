/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Spinner, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function ButtonScreen() {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const { colors, isDark } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Usage" />
      <Button>Basic Button</Button>

      <SectionTitle title="Sizes" />
      <View className="gap-8">
        <Button size="sm">Small Button</Button>
        <Button size="md">Medium Button</Button>
        <Button size="lg">Large Button</Button>
      </View>

      <SectionTitle title="Variants" />
      <View className="gap-8">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">
          <Button.Label>Danger</Button.Label>
        </Button>
      </View>

      <SectionTitle title="With Icons" />
      <View className="gap-8">
        <Button variant="primary">
          <Button.StartContent>
            <Ionicons name="add" size={20} color={colors.accentForeground} />
          </Button.StartContent>
          <Button.Label>Add Item</Button.Label>
        </Button>

        <Button variant="secondary">
          <Button.Label>Download</Button.Label>
          <Button.EndContent>
            <Ionicons
              name="download"
              size={18}
              color={colors.accentSoftForeground}
            />
          </Button.EndContent>
        </Button>

        <Button variant="tertiary">
          <Button.StartContent>
            <Ionicons name="heart" size={14} color={colors.defaultForeground} />
          </Button.StartContent>
          <Button.Label>Favorite</Button.Label>
          <Button.EndContent>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.defaultForeground}
            />
          </Button.EndContent>
        </Button>

        <Button variant="danger" size="sm">
          <Button.StartContent>
            <Ionicons name="trash" size={14} color={colors.dangerForeground} />
          </Button.StartContent>
          <Button.Label>Delete</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Disabled State" />
      <View className="gap-8">
        <Button isDisabled>
          <Button.StartContent>
            <Spinner color={isDark ? 'black' : 'white'} size="sm" />
          </Button.StartContent>
          <Button.Label>Loading</Button.Label>
        </Button>
        <Button variant="secondary" isDisabled>
          <Button.StartContent>
            <Spinner size="sm" color={isDark ? 'black' : 'default'} />
          </Button.StartContent>
          <Button.Label>Loading</Button.Label>
        </Button>
        <Button variant="tertiary" isDisabled>
          <Button.StartContent>
            <Ionicons
              name="alert-circle"
              size={16}
              color={colors.defaultForeground}
            />
          </Button.StartContent>
          <Button.Label>Access Denied</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Width/Alignment Control" />
      <View className="gap-8">
        <Button>Full Width Button</Button>
        <View>
          <Button variant="secondary" className="self-start">
            Start
          </Button>
          <Button variant="secondary" className="self-center">
            Center
          </Button>
          <Button variant="secondary" className="self-end">
            End
          </Button>
        </View>
      </View>

      <SectionTitle title="Icon Only Buttons" />
      <View className="self-center flex-row gap-8">
        <Button size="sm" isIconOnly>
          <Button.Label>
            <Ionicons name="add" size={16} color={colors.accentForeground} />
          </Button.Label>
        </Button>
        <Button size="md" variant="secondary" isIconOnly>
          <Button.Label>
            <Ionicons name="heart" size={18} color="#ec4899" />
          </Button.Label>
        </Button>
        <Button size="lg" variant="danger" isIconOnly>
          <Button.Label>
            <Ionicons name="trash" size={20} color={colors.dangerForeground} />
          </Button.Label>
        </Button>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-8">
        <Button className="bg-purple-600">
          <Button.Label classNames={{ text: 'text-white font-semibold' }}>
            Custom Purple
          </Button.Label>
        </Button>
        <Button
          variant="tertiary"
          className="border-purple-600/30 bg-purple-50"
        >
          <Button.StartContent>
            <Ionicons name="checkmark" size={18} color="#9333ea" />
          </Button.StartContent>
          <Button.Label classNames={{ text: 'text-purple-600' }}>
            Purple Tertiary
          </Button.Label>
        </Button>
        <Button>
          <Button.Background>
            <LinearGradient
              colors={['#9333ea', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Button.Background>
          <Button.Label classNames={{ text: 'text-white font-bold' }}>
            Gradient
          </Button.Label>
        </Button>
      </View>

      <SectionTitle title="Layout Transitions Demo" />
      <Button
        variant="primary"
        onPress={() => {
          setIsDownloading(true);
          setTimeout(() => {
            setIsDownloading(false);
          }, 3000);
        }}
        isIconOnly={isDownloading}
        className="self-center"
      >
        <Button.Label>
          {isDownloading ? (
            <Spinner
              entering={FadeIn.delay(50)}
              color={colors.accentForeground}
            />
          ) : (
            'Download now'
          )}
        </Button.Label>
      </Button>

      <SectionTitle title="Custom Animation" />
      <View className="gap-8">
        <Button
          animationConfig={{
            highlight: {
              config: {
                duration: 10,
              },
            },
          }}
          onPress={() => console.log('Fast animation')}
        >
          <Button.Label>Fast Highlight Animation</Button.Label>
        </Button>
        <Button
          animationConfig={{
            scale: {
              value: 0.9,
              config: {
                duration: 500,
              },
            },
          }}
          variant="secondary"
          onPress={() => console.log('Slow animation')}
        >
          <Button.Label>Slow Scale Animation</Button.Label>
        </Button>
      </View>
    </ScreenScrollView>
  );
}
