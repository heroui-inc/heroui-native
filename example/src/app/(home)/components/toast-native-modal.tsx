import { useLingui } from '@lingui/react/macro';
import { Button, useThemeColor, useToast } from 'heroui-native';
import { View } from 'react-native';
import { Logo } from '../../../components/logo';

export default function ToastNativeModalScreen() {
  const { t } = useLingui();
  const { toast } = useToast();

  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="pt-40 px-5 items-center justify-center gap-5">
      <Button
        variant="secondary"
        className="self-center"
        onPress={() => {
          toast.show({
            variant: 'default',
            label: t`Join a team`,
            description: t`Junior Garcia sent you an invitation to join HeroUI team!`,
            icon: (
              <View className="mt-0.5">
                <Logo
                  themeColorForeground={themeColorForeground}
                  width={15}
                  height={20.77}
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          });
        }}
      >
        {t`Show toast`}
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide toast`}
      </Button>
    </View>
  );
}
