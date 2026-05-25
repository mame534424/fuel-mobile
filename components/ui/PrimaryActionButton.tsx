import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  tone?: "solid" | "soft" | "ghost";
};

const toneClasses = {
  solid: "bg-emerald-700",
  soft: "bg-emerald-100",
  ghost: "bg-transparent border border-emerald-200",
} as const;

export default function PrimaryActionButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  tone = "solid",
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`h-14 items-center justify-center rounded-2xl px-5 ${toneClasses[tone]} ${isDisabled ? "opacity-60" : ""}`}
    >
      {loading ? (
        <ActivityIndicator color={tone === "ghost" || tone === "soft" ? "#0f7a47" : "white"} />
      ) : (
        <Text className={`text-base font-bold ${tone === "solid" ? "text-white" : "text-emerald-900"}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}