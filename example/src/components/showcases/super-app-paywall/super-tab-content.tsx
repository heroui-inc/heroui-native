import { Checkbox, Chip, ControlField, cn } from 'heroui-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { AppText } from '../../app-text';

type PlanOption = {
  id: 'monthly' | 'yearly';
  title: string;
  description: string;
  price: string;
  badge?: string;
};

const plans: PlanOption[] = [
  {
    id: 'monthly',
    title: 'Super Monthly',
    description: '5 apps for $7.99/mo',
    price: '$7.99/mo',
  },
  {
    id: 'yearly',
    title: 'Super Yearly',
    description: '5 apps for $49.99/year ($4.17/month)',
    price: '$49.99/year',
    badge: '48% OFF',
  },
];

/**
 * Super tab content component
 * Displays monthly and yearly subscription options
 */
export function SuperTabContent() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const { isDark } = useAppTheme();

  return (
    <View className="gap-4">
      {plans.map((plan) => {
        const isSelected = selectedPlan === plan.id;

        return (
          <View key={plan.id}>
            {plan.badge && (
              <View className="absolute top-2 right-2.5 z-50">
                <Chip
                  size="sm"
                  className={cn(
                    'rounded-full px-2 py-0.5',
                    isDark ? 'bg-neutral-700' : 'bg-neutral-300'
                  )}
                >
                  <Chip.Label className="text-foreground text-xs font-black">
                    {plan.badge}
                  </Chip.Label>
                </Chip>
              </View>
            )}
            <View
              className={cn(
                'rounded-3xl border-2 overflow-hidden',
                isSelected ? 'border-purple-500' : 'border-neutral-300'
              )}
              style={styles.formField}
            >
              <ControlField
                isSelected={isSelected}
                onSelectedChange={(value) => {
                  if (value) {
                    setSelectedPlan(plan.id);
                  }
                }}
                className={cn(
                  'bg-neutral-50 px-5 py-4',
                  isDark && 'bg-neutral-900'
                )}
              >
                <View className="gap-2">
                  <View className="flex-row items-center gap-3">
                    <ControlField.Indicator>
                      <Checkbox
                        className={cn(
                          'size-6 rounded-full',
                          isDark ? 'bg-neutral-700' : 'bg-neutral-200'
                        )}
                      >
                        <Checkbox.Indicator
                          className="bg-purple-500"
                          iconProps={{
                            size: 16,
                            color: 'white',
                          }}
                          animation={{
                            translateX: { value: [0, 0] },
                          }}
                        />
                      </Checkbox>
                    </ControlField.Indicator>
                    <AppText className="text-foreground text-lg font-black">
                      {plan.title}
                    </AppText>
                  </View>
                  <AppText className="text-foreground/80 text-base font-medium">
                    {plan.description}
                  </AppText>
                </View>
              </ControlField>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    borderCurve: 'continuous',
  },
});
