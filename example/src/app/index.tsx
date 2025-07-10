import { Switch, SwitchThumb } from 'heroui-native';
import { Check, Minus, Plus, X } from 'lucide-react-native';
import * as React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';

export default function App() {
  const [one, setOne] = React.useState(true);
  const [two, setTwo] = React.useState(true);

  return (
    <View className="flex-1 items-center justify-center bg-stone-50">
      <Text className="text-xl font-bold text-blue-600 mb-6">
        Welcome to HeroUI Native!
      </Text>
      <Switch
        width={40}
        height={25}
        isSelected={one}
        onSelectedChange={setOne}
        className="mb-6"
      >
        <SwitchThumb>
          {one ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Check size={12} color="#0A0A0A" strokeWidth={4} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <X size={14} color="#FAFAFA" strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchThumb>
      </Switch>

      <Switch isSelected={two} onSelectedChange={setTwo}>
        <SwitchThumb>
          {two ? (
            <Animated.View key="check" entering={FadeInUp}>
              <Plus size={12} color="#0A0A0A" strokeWidth={3.5} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={FadeInDown}>
              <Minus size={14} color="#FAFAFA" strokeWidth={3} />
            </Animated.View>
          )}
        </SwitchThumb>
      </Switch>
    </View>
  );
}
