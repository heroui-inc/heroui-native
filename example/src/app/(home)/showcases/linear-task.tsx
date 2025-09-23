import { Surface } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Assignee } from '../../../components/showcases/linear-task/dialogs/assignee';
import { Labels } from '../../../components/showcases/linear-task/dialogs/labels';
import { Priority } from '../../../components/showcases/linear-task/dialogs/priority';
import { Project } from '../../../components/showcases/linear-task/dialogs/project';
import { Status } from '../../../components/showcases/linear-task/dialogs/status';

export default function LinearTaskScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background px-5"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Surface
        variant="2"
        className="flex-row flex-wrap gap-x-2 gap-y-3 border-0 rounded-2xl"
      >
        <Status />
        <Priority />
        <Assignee />
        <Labels />
        <Project />
      </Surface>
    </View>
  );
}
