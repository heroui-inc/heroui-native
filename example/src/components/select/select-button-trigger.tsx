import { Select, Separator } from 'heroui-native';
import React, { useState } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

const US_STATES: SelectOption[] = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
];

type Props = {
  contentOffset?: number;
  selectionMode?: 'single' | 'multiple';
};

export function SelectButtonTrigger({
  contentOffset,
  selectionMode = 'single',
}: Props) {
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();
  const [basicValues, setBasicValues] = useState<SelectOption[]>([]);

  return (
    <Select
      value={selectionMode === 'single' ? basicValue : basicValues}
      onValueChange={
        selectionMode === 'single'
          ? (value) => setBasicValue(value as SelectOption)
          : (value) => setBasicValues(value as SelectOption[])
      }
      selectionMode={selectionMode}
    >
      <Select.Trigger>
        <Select.Value placeholder="Select one" numberOfLines={1} />
        <Select.TriggerIndicator />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          presentation="popover"
          width="trigger"
          offset={contentOffset}
        >
          <Select.ListLabel className="mb-2">Choose a state</Select.ListLabel>
          {US_STATES.map((state, index) => (
            <React.Fragment key={state.value}>
              <Select.Item value={state.value} label={state.label} />
              {index < US_STATES.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
