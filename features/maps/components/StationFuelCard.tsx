import { View, Text }
from "react-native";

interface Props {
  type: string;
  availableFuel: number;
}

export default function StationFuelCard({
  type,
  availableFuel,
}: Props) {

  return (
    <View
      className="
        mb-3
        rounded-2xl
        bg-white
        p-4
      "
    >
      <Text
        className="
          text-lg
          font-bold
        "
      >
        ⛽ {type}
      </Text>

      <Text
        className="
          mt-2
          text-gray-600
        "
      >
        {availableFuel} L available
      </Text>
    </View>
  );
}