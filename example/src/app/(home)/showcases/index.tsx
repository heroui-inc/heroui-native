import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Card, Chip, Divider, useTheme } from 'heroui-native';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

type ShowcaseCard = {
  title: string;
  description?: string;
  imageLight: string;
  imageDark: string;
  components: string[];
  path?: string;
};

const showcases: ShowcaseCard[] = [
  {
    title: 'Onboarding Flow',
    description: 'Onboarding step with marquee carousel of shadowed cards',
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-light-1.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcases-onboarding-dark-1.png',
    components: ['Button', 'Card', 'Divider', 'DropShadowView'],
    path: 'onboarding',
  },
];

export default function ShowcasesScreen() {
  const router = useRouter();

  const { colors, isDark } = useTheme();

  return (
    <ScreenScrollView>
      <View className="h-5" />
      <View className="gap-5">
        {showcases.map((showcase, index) => (
          <React.Fragment key={index}>
            <Pressable
              onPress={() => router.push(`/showcases/${showcase.path}`)}
            >
              <Card className="flex-row p-1.5 rounded-xl" surfaceVariant="2">
                <Image
                  source={{
                    uri: isDark ? showcase.imageDark : showcase.imageLight,
                  }}
                  className="w-[30%] aspect-[1/2.12] rounded-lg border border-border"
                  resizeMode="cover"
                />
                <Card.Details className="pl-3 pt-1">
                  <Card.Body>
                    <Card.Title>{showcase.title}</Card.Title>
                    <Card.Description className="text-sm mb-5">
                      {showcase.description}
                    </Card.Description>
                    <View className="flex-row flex-wrap gap-1">
                      {showcase.components.map((component, componentIndex) => (
                        <Chip
                          key={componentIndex}
                          size="sm"
                          variant="secondary"
                        >
                          {component}
                        </Chip>
                      ))}
                    </View>
                  </Card.Body>
                  <Card.Footer className="items-end">
                    <View className="w-9 h-9 rounded-full bg-background items-center justify-center">
                      <Feather
                        name="arrow-up-right"
                        size={20}
                        color={colors.foreground}
                      />
                    </View>
                  </Card.Footer>
                </Card.Details>
              </Card>
            </Pressable>
            {index < showcases.length - 1 && <Divider className="-mx-5" />}
          </React.Fragment>
        ))}
      </View>
    </ScreenScrollView>
  );
}
