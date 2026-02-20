import { Description, FieldError, Label, SearchField } from 'heroui-native';
import { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { WithStateToggle } from '../../../components/with-state-toggle';

const KeyboardAvoidingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { height } = useWindowDimensions();

  const { progress } = useReanimatedKeyboardAnimation();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(progress.get() === 1 ? -height * 0.15 : 0, {
            duration: 250,
          }),
        },
      ],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};

// ------------------------------------------------------------------------------

const BasicSearchFieldContent = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithDescriptionContent = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <Label>Find products</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>Search by name, category, or SKU</Description>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithValidationContent = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <WithStateToggle
      isSelected={isInvalid}
      onSelectedChange={setIsInvalid}
      label="Simulate Error"
      description="Toggle validation error state"
    >
      <View className="flex-1 pt-[55%]">
        <KeyboardAvoidingContainer>
          <SearchField
            value={searchValue}
            onChange={setSearchValue}
            isRequired
            isInvalid={isInvalid}
          >
            <Label>Search users</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description hideOnInvalid>
              Enter at least 3 characters to search
            </Description>
            <FieldError>
              No results found. Please try a different search term.
            </FieldError>
          </SearchField>
        </KeyboardAvoidingContainer>
      </View>
    </WithStateToggle>
  );
};

// ------------------------------------------------------------------------------

const CustomSearchIconContent = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <Label>Search</Label>
          <SearchField.Group>
            <SearchField.SearchIcon>
              <Text className="text-base">🔍</Text>
            </SearchField.SearchIcon>
            <SearchField.Input className="pl-10" />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>Uses a custom search emoji icon</Description>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  const [activeValue, setActiveValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <SearchField value={activeValue} onChange={setActiveValue}>
            <Label>Active search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description>Type to search</Description>
          </SearchField>

          <SearchField value="Previous query" isDisabled>
            <Label>Disabled search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input />
            </SearchField.Group>
            <Description>Search is temporarily unavailable</Description>
          </SearchField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SEARCH_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-search-field',
    label: 'Basic search field',
    content: <BasicSearchFieldContent />,
  },
  {
    value: 'with-label-and-description',
    label: 'With label & description',
    content: <WithDescriptionContent />,
  },
  {
    value: 'with-validation',
    label: 'With validation',
    content: <WithValidationContent />,
  },
  {
    value: 'custom-search-icon',
    label: 'Custom search icon',
    content: <CustomSearchIconContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
];

export default function SearchFieldScreen() {
  return <UsageVariantFlatList data={SEARCH_FIELD_VARIANTS} />;
}
