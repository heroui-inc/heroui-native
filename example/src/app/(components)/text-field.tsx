import { Ionicons } from '@expo/vector-icons';
import { TextField, useTheme } from 'heroui-native';
import { ScrollView, View } from 'react-native';

export default function TextFieldScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      className="bg-background"
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustKeyboardInsets
    >
      <View className="gap-8 p-6">
        {/* Basic TextField */}
        <TextField>
          <TextField.Label>Email</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField.Description>
            We'll never share your email with anyone else.
          </TextField.Description>
        </TextField>

        {/* TextField with Icons */}
        <TextField>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input placeholder="Enter your password" secureTextEntry>
            <TextField.InputStartContent className="pointer-events-none">
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent className="pointer-events-none">
              <Ionicons
                name="eye-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>

        {/* TextField without asterisk */}
        <TextField>
          <TextField.Label hideAsterisk>Optional Field</TextField.Label>
          <TextField.Input placeholder="This field is optional" />
        </TextField>

        {/* Disabled TextField */}
        <TextField isDisabled>
          <TextField.Label>Disabled Field</TextField.Label>
          <TextField.Input
            placeholder="This field is disabled"
            value="Cannot edit this"
          />
        </TextField>

        {/* TextField with only Input */}
        <TextField>
          <TextField.Input placeholder="No label, just input" />
        </TextField>

        {/* TextField with multiline */}
        <TextField>
          <TextField.Label>Message</TextField.Label>
          <TextField.Input
            placeholder="Type your message here..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TextField.Description>Maximum 500 characters</TextField.Description>
        </TextField>

        {/* TextField with custom styles */}
        <TextField>
          <TextField.Label>Custom Styled</TextField.Label>
          <TextField.Input
            placeholder="Custom colors"
            classNames={{
              container: 'border-accent',
              input: 'text-accent',
            }}
          />
        </TextField>

        {/* TextField with search icon */}
        <TextField>
          <TextField.Label hideAsterisk>Search</TextField.Label>
          <TextField.Input placeholder="Search...">
            <TextField.InputStartContent>
              <Ionicons
                name="search-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
          </TextField.Input>
        </TextField>

        {/* TextField with custom colors */}
        <TextField>
          <TextField.Label>Custom Colors</TextField.Label>
          <TextField.Input
            placeholder="Custom color animation"
            placeholderTextColor="#2e1065"
            colors={{
              blurBackground: '#e9d5ff',
              focusBackground: '#c4b5fd',
              blurBorder: '#c4b5fd',
              focusBorder: '#a78bfa',
            }}
            animationConfig={{
              duration: 300,
            }}
            className="text-violet-950"
          />
          <TextField.Description>
            This input has custom colors and slower animation
          </TextField.Description>
        </TextField>
      </View>
    </ScrollView>
  );
}
