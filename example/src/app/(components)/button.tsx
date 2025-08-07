import { LinearGradient } from 'expo-linear-gradient';
import { Button, Spinner, Surface, Switch, useTheme } from 'heroui-native';
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Heart,
  Plus,
  Star,
  Trash2,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ButtonScreen() {
  const { colors, isDark } = useTheme();

  // States for layout transition demo
  const [showStartContent, setShowStartContent] = React.useState(true);
  const [showLabel, setShowLabel] = React.useState(true);
  const [showEndContent, setShowEndContent] = React.useState(true);

  // State for download button demo
  const [isDownloading, setIsDownloading] = React.useState(false);

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Basic Usage
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button onPress={() => console.log('Button pressed')}>
          Basic Button
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Layout Transitions Demo
      </Text>

      <View className="w-full gap-4 mb-6">
        {/* Control switches for toggling button parts */}
        <Surface variant="3" className="gap-3">
          <Text className="text-base font-semibold text-foreground mb-2">
            Toggle Button Parts
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-foreground">Start Content</Text>
            <Switch
              isSelected={showStartContent}
              onSelectedChange={setShowStartContent}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-foreground">Label</Text>
            <Switch isSelected={showLabel} onSelectedChange={setShowLabel} />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-foreground">End Content</Text>
            <Switch
              isSelected={showEndContent}
              onSelectedChange={setShowEndContent}
            />
          </View>
        </Surface>

        {/* Animated button with dynamic content */}
        <Button
          variant="primary"
          onPress={() => console.log('Dynamic button pressed')}
          fullWidth={false}
        >
          {showStartContent && (
            <Button.StartContent>
              <Star
                size={18}
                color={colors.accentForeground}
                fill={colors.accentForeground}
              />
            </Button.StartContent>
          )}
          {showLabel && <Button.Label>Dynamic Button</Button.Label>}
          {showEndContent && (
            <Button.EndContent>
              <ArrowRight size={18} color={colors.accentForeground} />
            </Button.EndContent>
          )}
        </Button>

        {/* Download button with loading state transition */}
        <Button
          variant="primary"
          onPress={() => {
            setIsDownloading(true);
            // Simulate download completion after 3 seconds
            setTimeout(() => {
              setIsDownloading(false);
            }, 3000);
          }}
          fullWidth={false}
          onlyIcon={isDownloading}
        >
          <Button.Label>
            {isDownloading ? (
              <Spinner color={colors.accentForeground} />
            ) : (
              'Download now'
            )}
          </Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Sizes
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button size="sm">
          <Button.Label>Small Button</Button.Label>
        </Button>
        <Button size="md">
          <Button.Label>Medium Button</Button.Label>
        </Button>
        <Button size="lg">
          <Button.Label>Large Button</Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Variants
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button variant="primary">
          <Button.Label>Primary</Button.Label>
        </Button>
        <Button variant="secondary">
          <Button.Label>Secondary</Button.Label>
        </Button>
        <Button variant="tertiary">
          <Button.Label>Tertiary</Button.Label>
        </Button>
        <Button variant="ghost">
          <Button.Label>Ghost</Button.Label>
        </Button>
        <Button variant="danger">
          <Button.Label>Danger</Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Icons
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button variant="primary">
          <Button.StartContent>
            <Plus size={20} color={colors.accentForeground} />
          </Button.StartContent>
          <Button.Label>Add Item</Button.Label>
        </Button>

        <Button variant="secondary">
          <Button.Label>Download</Button.Label>
          <Button.EndContent>
            <Download size={18} color={colors.accentSoftForeground} />
          </Button.EndContent>
        </Button>

        <Button variant="tertiary">
          <Button.StartContent>
            <Heart
              size={14}
              color={colors.defaultForeground}
              fill={colors.defaultForeground}
            />
          </Button.StartContent>
          <Button.Label>Favorite</Button.Label>
          <Button.EndContent>
            <ChevronRight size={18} color={colors.defaultForeground} />
          </Button.EndContent>
        </Button>

        <Button variant="danger" size="sm">
          <Button.StartContent>
            <Trash2 size={14} color={colors.dangerForeground} />
          </Button.StartContent>
          <Button.Label>Delete</Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Disabled State
      </Text>
      <View className="w-full gap-4 mb-6">
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
            <AlertCircle size={16} color={colors.defaultForeground} />
          </Button.StartContent>
          <Button.Label>Access Denied</Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Full Width Control
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button fullWidth>
          <Button.Label>Full Width Button</Button.Label>
        </Button>
        <View className="flex-row gap-4">
          <Button fullWidth={false} variant="secondary" size="sm">
            <Button.Label>Auto</Button.Label>
          </Button>
          <Button fullWidth={false} variant="secondary" size="md">
            <Button.Label>Width</Button.Label>
          </Button>
          <Button fullWidth={false} variant="secondary" size="lg">
            <Button.Label>Buttons</Button.Label>
          </Button>
        </View>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Icon Only Buttons
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Button size="sm" fullWidth={false} onlyIcon>
          <Button.Label>
            <Plus size={16} color={colors.accentForeground} />
          </Button.Label>
        </Button>
        <Button size="md" fullWidth={false} variant="secondary" onlyIcon>
          <Button.Label>
            <Heart size={18} color="#ec4899" fill="#ec4899" />
          </Button.Label>
        </Button>
        <Button size="lg" fullWidth={false} variant="danger" onlyIcon>
          <Button.Label>
            <Trash2 size={20} color={colors.dangerForeground} />
          </Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Styling
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button className="bg-purple-600">
          <Button.Label classNames={{ text: 'text-white' }}>
            Custom Purple
          </Button.Label>
        </Button>
        <Button
          variant="tertiary"
          className="border-purple-600/30 bg-purple-50"
        >
          <Button.StartContent>
            <Check size={18} color="#9333ea" />
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
              style={StyleSheet.absoluteFill}
            />
          </Button.Background>
          <Button.Label classNames={{ text: 'text-white font-bold' }}>
            Gradient
          </Button.Label>
        </Button>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Animation
      </Text>

      <View className="w-full gap-4 mb-6">
        <Button
          animationConfig={{
            scale: {
              config: {
                duration: 50,
              },
            },
          }}
          onPress={() => console.log('Fast animation')}
        >
          <Button.Label>Fast Press Animation</Button.Label>
        </Button>
        <Button
          animationConfig={{
            scale: {
              config: {
                duration: 300,
              },
            },
          }}
          variant="secondary"
          onPress={() => console.log('Slow animation')}
        >
          <Button.Label>Slow Press Animation</Button.Label>
        </Button>
      </View>
    </ScrollView>
  );
}
