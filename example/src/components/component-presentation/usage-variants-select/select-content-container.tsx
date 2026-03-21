import { Select } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import { Easing, FadeOut } from 'react-native-reanimated';

export const SelectContentContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Select.Content
      presentation="dialog"
      classNames={{
        wrapper: 'p-0 justify-start',
        content: 'size-full p-0 border-0 bg-transparent gap-2',
      }}
      isSwipeable={false}
      animation={{
        entering: undefined,
        exiting: FadeOut.duration(150).easing(Easing.out(Easing.quad)),
      }}
    >
      {children}
    </Select.Content>
  );
};
