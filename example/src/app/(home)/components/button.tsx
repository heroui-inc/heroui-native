import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Spinner } from 'heroui-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import { useUniwind, withUniwind } from 'uniwind';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const StyledIonicons = withUniwind(Ionicons);

export default function ButtonScreen() {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const { theme } = useUniwind();
  const isDark = theme === 'dark';

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
        <Button variant="danger">Danger</Button>
      </View>

      <SectionTitle title="With Icons" />
      <View className="gap-8">
        <Button variant="primary">
          <StyledIonicons
            name="add"
            size={20}
            className="text-accent-foreground"
          />
          <Button.Label>Add Item</Button.Label>
        </Button>

        <Button variant="secondary">
          <Button.Label>Download</Button.Label>
          <StyledIonicons
            name="download"
            size={18}
            className="text-accent-soft-foreground"
          />
        </Button>

        <Button variant="tertiary">
          <StyledIonicons
            name="heart"
            size={14}
            className="text-default-foreground"
          />
          <Button.Label>Favorite</Button.Label>
          <StyledIonicons
            name="chevron-forward"
            size={18}
            className="text-default-foreground"
          />
        </Button>

        <Button variant="danger" size="sm">
          <StyledIonicons
            name="trash"
            size={14}
            className="text-danger-foreground"
          />
          <Button.Label>Delete</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Disabled State" />
      <View className="gap-8">
        <Button isDisabled>
          <Spinner color={isDark ? 'black' : 'white'} size="sm" />
          <Button.Label>Loading</Button.Label>
        </Button>
        <Button variant="secondary" isDisabled>
          <Spinner size="sm" color={isDark ? 'black' : 'default'} />
          <Button.Label>Loading</Button.Label>
        </Button>
        <Button variant="tertiary" isDisabled>
          <StyledIonicons
            name="alert-circle"
            size={16}
            className="text-default-foreground"
          />
          <Button.Label>Access Denied</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Width/Alignment Control" />
      <View className="gap-8">
        <Button>Full Width Button</Button>
        <View>
          <Button variant="secondary" size="sm" className="self-start">
            Start
          </Button>
          <Button variant="secondary" size="sm" className="self-center">
            Center
          </Button>
          <Button variant="secondary" size="sm" className="self-end">
            End
          </Button>
        </View>
      </View>

      <SectionTitle title="Icon Only Buttons" />
      <View className="self-center flex-row gap-8">
        <Button size="sm" isIconOnly>
          <Button.Label>
            <StyledIonicons
              name="add"
              size={16}
              className="text-accent-foreground"
            />
          </Button.Label>
        </Button>
        <Button size="md" variant="secondary" isIconOnly>
          <Button.Label>
            <StyledIonicons name="heart" size={18} className="text-pink-500" />
          </Button.Label>
        </Button>
        <Button size="lg" variant="danger" isIconOnly>
          <Button.Label>
            <StyledIonicons
              name="trash"
              size={20}
              className="text-danger-foreground"
            />
          </Button.Label>
        </Button>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-8">
        <Button className="bg-purple-600">
          <Button.Label className="text-white font-semibold">
            Custom Purple
          </Button.Label>
        </Button>
        <Button
          variant="tertiary"
          className="border-purple-600/30 bg-purple-50"
        >
          <StyledIonicons
            name="checkmark"
            size={18}
            className="text-purple-600"
          />
          <Button.Label className="text-purple-600">
            Purple Tertiary
          </Button.Label>
        </Button>
        <Button>
          <LinearGradient
            colors={['#9333ea', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Button.Label className="text-white font-bold">Gradient</Button.Label>
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
        {isDownloading ? (
          <Spinner entering={FadeIn.delay(50)} color="white" />
        ) : (
          'Download now'
        )}
      </Button>
    </ScreenScrollView>
  );
}
