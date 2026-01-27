import { useHeaderHeight } from '@react-navigation/elements';
import { ControlField, Description, Label, Separator } from 'heroui-native';
import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Props for the WithStateToggle component
 */
export interface WithStateToggleProps {
  /** Main content to render */
  children: ReactNode;

  /** Whether the toggle is selected */
  isSelected: boolean;

  /** Callback when selection state changes */
  onSelectedChange: (isSelected: boolean) => void;

  /** Label text for the toggle */
  label: string;

  /** Description text displayed below the label */
  description?: string;
}

/**
 * Reusable container component that wraps content with a toggle at the bottom.
 * Provides consistent styling and layout with proper safe area handling.
 *
 * @example
 * ```tsx
 * <WithStateToggle
 *   isSelected={enabled}
 *   onSelectedChange={setEnabled}
 *   label="Enable Feature"
 *   description="Turn on this feature to enable advanced options"
 * >
 *   <YourContent />
 * </WithStateToggle>
 * ```
 */
export const WithStateToggle: FC<WithStateToggleProps> = ({
  children,
  isSelected,
  onSelectedChange,
  label,
  description,
}) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-between px-5"
      style={{
        paddingTop: headerHeight + 20,
        paddingBottom: insets.bottom + 110,
      }}
    >
      {children}
      <View>
        <ControlField
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          className="pr-2"
        >
          <View className="flex-1">
            <Label>{label}</Label>
            {description && <Description>{description}</Description>}
          </View>
          <ControlField.Indicator />
        </ControlField>
        <Separator className="mt-6" />
      </View>
    </View>
  );
};
