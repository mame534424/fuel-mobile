import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
};

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightSlot,
}: Props) {
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        {onBack ? (
          <Pressable
            onPress={onBack}
            className="h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white/90"
          >
            <Ionicons name="chevron-back" size={22} color="#0f7a47" />
          </Pressable>
        ) : null}

        <View>
          <Text className="text-3xl font-black text-emerald-950">{title}</Text>
          {subtitle ? (
            <Text className="mt-1 text-sm text-emerald-700">{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {rightSlot ? <View>{rightSlot}</View> : null}
    </View>
  );
}