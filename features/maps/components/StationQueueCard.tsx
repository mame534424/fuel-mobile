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
        rounded-2xl
        bg-orange-100
        p-4
      "
    >
      <Text
        className="
          text-lg
          font-bold
          text-orange-700
        "
      >
        🚗 {queueCount} Cars Ahead
      </Text>
    </View>
  );
}