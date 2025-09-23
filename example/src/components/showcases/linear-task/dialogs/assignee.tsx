import { Avatar, Chip } from 'heroui-native';
import { type FC } from 'react';
import { AppText } from '../../../app-text';

export const Assignee: FC = () => {
  return (
    <Chip className="bg-surface-3 pl-1 pr-2">
      <Chip.StartContent>
        <Avatar alt="volo" className="size-[18px] bg-blue-500">
          <Avatar.Fallback>
            <AppText className="text-[8px] font-semibold text-foreground">
              VS
            </AppText>
          </Avatar.Fallback>
        </Avatar>
      </Chip.StartContent>
      <Chip.LabelContent classNames={{ text: 'text-foreground font-medium' }}>
        volo
      </Chip.LabelContent>
    </Chip>
  );
};
