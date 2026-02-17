import { Description, FieldError, Label, SearchField } from 'heroui-native';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
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
        <SearchField>
          <Label>Search</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              value={searchValue}
              onChangeText={setSearchValue}
            />
            {searchValue.length > 0 && (
              <SearchField.ClearButton onPress={() => setSearchValue('')} />
            )}
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
        <SearchField>
          <Label>Find products</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              value={searchValue}
              onChangeText={setSearchValue}
            />
            {searchValue.length > 0 && (
              <SearchField.ClearButton onPress={() => setSearchValue('')} />
            )}
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
          <SearchField isRequired isInvalid={isInvalid}>
            <Label>Search users</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                value={searchValue}
                onChangeText={setSearchValue}
              />
              {searchValue.length > 0 && (
                <SearchField.ClearButton onPress={() => setSearchValue('')} />
              )}
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

const DisabledContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <SearchField>
            <Label>Active search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input />
            </SearchField.Group>
            <Description>Type to search</Description>
          </SearchField>

          <SearchField isDisabled>
            <Label>Disabled search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input value="Previous query" />
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
    value: 'with-description',
    label: 'With description',
    content: <WithDescriptionContent />,
  },
  {
    value: 'with-validation',
    label: 'With validation',
    content: <WithValidationContent />,
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
