import {
  View,
  Text,
  TextInput,
  TextInputProps,
} from "react-native";

type Props = Omit<TextInputProps, "value" | "onChange" | "onChangeText"> & {

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
  placeholder,
  autoCapitalize,
  keyboardType,
  textContentType,
}: Props) {

  return (
    <View className="mb-5">

      <Text
        className="
          mb-2
          text-sm
          font-semibold
          text-emerald-900
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
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        textContentType={textContentType}
        placeholderTextColor="#8ca08f"
        selectionColor="#0f7a47"

        className="
          h-14
          rounded-2xl
          border border-emerald-100
          bg-white/95
          px-4
          text-base
          text-emerald-950
        "
      />

      {error && (
        <Text
          className="
            mt-1
            text-sm
            text-red-600
          "
        >
          {error}
        </Text>
      )}

    </View>
  );
}