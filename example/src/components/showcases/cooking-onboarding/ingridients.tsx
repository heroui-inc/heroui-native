import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Divider } from 'heroui-native';
import { type FC } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';

const StyledEntypo = withUniwind(Entypo);
const StyledIonicons = withUniwind(Ionicons);

type IngredientItemProps = {
  name: string;
  description: string;
};

const IngredientItem: FC<IngredientItemProps> = ({ name, description }) => {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-col flex-1">
        <AppText className="text-base text-foreground">{name}</AppText>
        <AppText className="text-sm text-muted">{description}</AppText>
      </View>
      <View className="flex-row gap-2">
        <Button
          variant="secondary"
          size="sm"
          isIconOnly
          className="rounded-full"
          onPress={simulatePress}
        >
          <StyledIonicons
            name="sparkles-sharp"
            size={14}
            className="text-foreground"
          />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          isIconOnly
          className="rounded-full"
          onPress={simulatePress}
        >
          <StyledEntypo name="plus" size={16} className="text-foreground" />
        </Button>
      </View>
    </View>
  );
};

export const Ingridients: FC = () => {
  return (
    <View className="mt-5">
      <AppText className="text-xl text-foreground font-semibold mb-3">
        Ingredients
      </AppText>
      <View>
        <IngredientItem name="All-purpose flour" description="250g" />
        <Divider />
        <IngredientItem name="Baking powder" description="2 tsp" />
        <Divider />
        <IngredientItem name="Sugar" description="2 tbsp" />
        <Divider />
        <IngredientItem name="Salt" description="to taste" />
        <Divider />
        <IngredientItem name="Milk" description="300ml" />
        <Divider />
        <IngredientItem name="Eggs" description="2 large" />
        <Divider />
        <IngredientItem name="Butter" description="50g, melted" />
        <Divider />
        <IngredientItem name="Fresh blueberries" description="150g" />
        <Divider />
        <IngredientItem name="Vanilla extract" description="1 tsp" />
      </View>
    </View>
  );
};
