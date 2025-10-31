import { Select, useSelect } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export const SelectContentContainer: FC<PropsWithChildren> = ({ children }) => {
  const { progress } = useSelect();

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
    };
  });

  return (
    <Select.Content
      classNames={{
        wrapper: 'p-0 justify-start',
        content: 'size-full p-0 border-0 bg-transparent gap-2',
      }}
      presentation="dialog"
      isDefaultAnimationDisabled
      style={rContainerStyle}
    >
      {children}
    </Select.Content>
  );
};
