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
};

export function SelectButtonTrigger({ contentOffset }: Props) {
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();

  return (
    <Select value={basicValue} onValueChange={setBasicValue}>
      <Select.Trigger>
        <Select.Value placeholder="Select one" />
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
