import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import {
  ListGroup,
  PressableFeedback,
  Separator,
  useToast,
} from 'heroui-native';
import { Fragment, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { COMPONENTS } from '../../../helpers/data/components';

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  const { toast, isToastVisible } = useToast();

  useEffect(() => {
    if (isToastVisible && pathname === '/components') {
      toast.hide('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastVisible, pathname]);

  return (
    <ScreenScrollView contentContainerClassName="px-4">
      <View className="h-5" />
      <ListGroup>
        {COMPONENTS.map((item, index) => (
          <Fragment key={item.title}>
            {index > 0 && <Separator className="mx-4" />}
            <PressableFeedback
              animation={false}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/components/${item.path}`);
              }}
            >
              <PressableFeedback.Scale>
                <ListGroup.Item disabled>
                  <ListGroup.ItemContent>
                    <ListGroup.ItemTitle className="font-normal">
                      {item.title}
                    </ListGroup.ItemTitle>
                  </ListGroup.ItemContent>
                  <ListGroup.ItemSuffix />
                </ListGroup.Item>
              </PressableFeedback.Scale>
            </PressableFeedback>
          </Fragment>
        ))}
      </ListGroup>
    </ScreenScrollView>
  );
}
