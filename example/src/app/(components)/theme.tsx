import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from 'heroui-native';
import { Download, Heart } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Theme() {
  const { colors } = useTheme();
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-4">
        <Button
          variant="primary"
          onPress={() => console.log('Download pressed')}
        >
          <Button.StartContent>
            <Download size={18} color={colors.accentForeground} />
          </Button.StartContent>
          <Button.Label>Download File</Button.Label>
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
            Gradient Button
          </Button.Label>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          isFullWidth={false}
          className="self-end"
        >
          <Button.Label>Like</Button.Label>
          <Button.EndContent>
            <Heart size={16} color={colors.accentSoftForeground} />
          </Button.EndContent>
        </Button>
      </View>
    </ScrollView>
  );
}
