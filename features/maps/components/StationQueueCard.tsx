import { View, Text }
from "react-native";

interface Props {
  queueCount: string | null;
}

export default function StationQueueCard({
  queueCount,
}: Props) {

  return (
    <View
      className="
        mb-4
        rounded-3xl
        border border-amber-200
        bg-amber-50
        p-4
      "
    >
      <Text
        className="
          text-sm
          uppercase
          tracking-[0.16em]
          text-amber-800
        "
      >
        Queue
      </Text>

      <Text
        className="
          mt-2
          text-2xl
          font-bold
          text-amber-950
        "
      >
        {queueCount ?? "0"} cars ahead
      </Text>
    </View>
  );
}