import {
  View,
  Text,
  TextInput,
} from "react-native";

interface Props {

  label: string;

  value: string;

  onChange: (
    text: string
  ) => void;

  secureTextEntry?: boolean;

  error?: string;
}

export default function TextInputField({
  label,
  value,
  onChange,
  secureTextEntry,
  error,
}: Props) {

  return (
    <View className="mb-5">

      <Text
        className="
          mb-2
          text-sm
          font-semibold
          text-gray-600
        "
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={
          secureTextEntry
        }

        className="
          h-14
          rounded-2xl
          border
          border-gray-300
          bg-white
          px-4
          text-base
        "
      />

      {error && (
        <Text
          className="
            mt-1
            text-red-500
          "
        >
          {error}
        </Text>
      )}

    </View>
  );
}