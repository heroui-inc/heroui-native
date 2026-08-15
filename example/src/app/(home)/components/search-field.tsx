import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder={t`Search...`} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithoutSearchIconContent = () => {
  const { t } = useLingui();
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <SearchField.Group>
            <SearchField.Input placeholder={t`Search...`} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithDescriptionContent = () => {
  const { t } = useLingui();
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <Label>{t`Find products`}</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder={t`Search...`} />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>{t`Search by name, category, or SKU`}</Description>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithValidationContent = () => {
  const { t } = useLingui();
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <WithStateToggle
      isSelected={isInvalid}
      onSelectedChange={setIsInvalid}
      label={t`Simulate Error`}
      description={t`Toggle validation error state`}
    >
      <View className="flex-1 pt-[55%]">
        <KeyboardAvoidingContainer>
          <SearchField
            value={searchValue}
            onChange={setSearchValue}
            isRequired
            isInvalid={isInvalid}
          >
            <Label>{t`Search users`}</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder={t`Search...`} />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description hideOnInvalid>
              {t`Enter at least 3 characters to search`}
            </Description>
            <FieldError>
              {t`No results found. Please try a different search term.`}
            </FieldError>
          </SearchField>
        </KeyboardAvoidingContainer>
      </View>
    </WithStateToggle>
  );
};

// ------------------------------------------------------------------------------

const CustomSearchIconContent = () => {
  const { t } = useLingui();
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <SearchField value={searchValue} onChange={setSearchValue}>
          <Label>{t`Search`}</Label>
          <SearchField.Group>
            <SearchField.SearchIcon>
              <Text className="text-base" maxFontSizeMultiplier={1.6}>
                🔍
              </Text>
            </SearchField.SearchIcon>
            <SearchField.Input
              className="ps-10"
              maxFontSizeMultiplier={1.6}
              placeholder={t`Search...`}
            />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>{t`Uses a custom search emoji icon`}</Description>
        </SearchField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  const { t } = useLingui();
  const [activeValue, setActiveValue] = useState('');

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <SearchField value={activeValue} onChange={setActiveValue}>
            <Label>{t`Active search`}</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder={t`Search...`} />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description>{t`Type to search`}</Description>
          </SearchField>

          <SearchField value={t`Previous query`} isDisabled>
            <Label>{t`Disabled search`}</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder={t`Search...`} />
            </SearchField.Group>
            <Description>{t`Search is temporarily unavailable`}</Description>
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
    label: msg`Basic search field`,
    content: <BasicSearchFieldContent />,
  },
  {
    value: 'without-search-icon',
    label: msg`Without search icon`,
    content: <WithoutSearchIconContent />,
  },
  {
    value: 'with-label-and-description',
    label: msg`With label & description`,
    content: <WithDescriptionContent />,
  },
  {
    value: 'with-validation',
    label: msg`With validation`,
    content: <WithValidationContent />,
  },
  {
    value: 'custom-search-icon',
    label: msg`Custom search icon`,
    content: <CustomSearchIconContent />,
  },
  {
    value: 'disabled',
    label: msg`Disabled`,
    content: <DisabledContent />,
  },
];

export default function SearchFieldScreen() {
  return <UsageVariantFlatList data={SEARCH_FIELD_VARIANTS} />;
}
