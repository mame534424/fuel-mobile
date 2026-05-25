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
        rounded-3xl
        border border-emerald-100
        bg-white/95
        p-4
      "
    >
      <Text
        className="
          text-base
          font-bold
          text-emerald-950
        "
      >
        {type}
      </Text>

      <Text
        className="
          mt-2
          text-sm
          text-emerald-700
        "
      >
        {availableFuel} L available
      </Text>
    </View>
  );
}