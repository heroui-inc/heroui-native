/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import { SectionTitle } from '../../../components/section-title';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { PressableFeedback } from 'heroui-native';
import { AppText } from '../../../components/app-text';

export default function PressableFeedbackScreen() {
    return (
        <ScreenScrollView contentContainerClassName="gap-16 p-4">
            {/* Basic */}
            <SectionTitle title="Basic Usage (Platform Default)" />
            <PressableFeedback className="p-4 rounded-lg items-center">
                <AppText className="text-foreground">Press Me</AppText>
            </PressableFeedback>

            {/* Variants */}
            <SectionTitle title="Variants" />
            <View className="gap-8">
                <PressableFeedback
                    variant="highlight"
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">
                        Highlight Variant
                    </AppText>
                </PressableFeedback>
                <PressableFeedback
                    variant="ripple"
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">
                        Ripple Variant
                    </AppText>
                </PressableFeedback>
            </View>

            {/* Custom Colors */}
            <SectionTitle title="Custom Colors" />
            <View className="gap-8">
                <PressableFeedback
                    variant="highlight"
                    color="red"
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">Red Highlight</AppText>
                </PressableFeedback>
                <PressableFeedback
                    variant="ripple"
                    color="blue"
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">Blue Ripple</AppText>
                </PressableFeedback>
            </View>

            {/* Custom Opacity and Durations */}
            <SectionTitle title="Custom Opacity and Durations" />
            <View className="gap-8">
                <PressableFeedback
                    variant="highlight"
                    animationConfig={{ opacity: 0.5, duration: 500 }}
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">
                        Slow Highlight
                    </AppText>
                </PressableFeedback>
                <PressableFeedback
                    variant="ripple"
                    animationConfig={{ opacity: 0.1, duration: 500 }}
                    className="p-4 rounded-lg items-center"
                >
                    <AppText className="text-foreground">
                        Faint Ripple
                    </AppText>
                </PressableFeedback>
            </View>

            {/* Radius / Shape */}
            <SectionTitle title="Shapes and Radius" />
            <View className="gap-8 flex-row justify-around">
                <PressableFeedback
                    variant="ripple"
                    className="h-12 w-20 rounded-none items-center justify-center"
                >
                    <AppText className="text-foreground">Square</AppText>
                </PressableFeedback>
                <PressableFeedback
                    variant="ripple"
                    className="h-12 w-20 rounded-lg items-center justify-center"
                >
                    <AppText className="text-foreground">Rounded</AppText>
                </PressableFeedback>
                <PressableFeedback
                    variant="ripple"
                    className="h-12 w-12 rounded-full items-center justify-center"
                >
                    <AppText className="text-foreground">Circle</AppText>
                </PressableFeedback>
            </View>
        </ScreenScrollView>
    );
}
