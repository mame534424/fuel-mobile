import {
  View,
  Text,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  socket,
} from "@/services/socket";

import {
  getActiveBooking,
} from "@/features/status/services/status.services";


export default function StatusScreen() {

  const [
  booking,
  setBooking,
] = useState<any>(null);

const [
  loading,
  setLoading,
] = useState(true);

  useEffect(() => {

  async function loadBooking() {

    try {

      const data =
        await getActiveBooking();
      console.log("Active booking data:", data);

      setBooking({
        ...data.booking,
        carsAhead:
          data.carsAhead,
      });

      socket.connect();

      socket.emit(
        "join_booking",
        data.booking.id
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  loadBooking();

  return () => {
    socket.disconnect();
  };

}, []);
useEffect(() => {

  socket.on(
    "queue_updated",
    (data) => {

      setBooking(
        (prev: any) => ({
          ...prev,
          carsAhead:
            data.carsAhead,
      }));
  });

  socket.on(
    "booking_called",
    () => {

      setBooking(
        (prev: any) => ({
          ...prev,
          status:
            "CALLED",
      }));
  });

  socket.on(
    "booking_completed",
    () => {

      setBooking(
        (prev: any) => ({
          ...prev,
          status:
            "COMPLETED",
      }));
  });

  return () => {

    socket.off(
      "queue_updated"
    );

    socket.off(
      "booking_called"
    );

    socket.off(
      "booking_completed"
    );
  };

}, []);
if (loading) {

  return (

    <View
      className="
        flex-1
        items-center
        justify-center
      "
    >

      <Text>
        Loading...
      </Text>

    </View>
  );
}
if (!booking) {

  return (

    <View
      className="
        flex-1
        items-center
        justify-center
        bg-background
      "
    >

      <Text
        className="
          text-xl
          font-semibold
        "
      >
        No Active Booking
      </Text>

    </View>
  );
}

  return (
    <View
      className="
        flex-1
        bg-background
        px-6
        pt-20
      "
    >

      <Text
        className="
          text-3xl
          font-bold
          text-primary
        "
      >
        My Booking
      </Text>

      {/* Queue Card */}

      <View
        className="
          mt-10
          rounded-3xl
          bg-primary
          p-8
        "
      >

        <Text
          className="
            text-center
            text-white/70
          "
        >
          Cars Ahead
        </Text>

        <Text
          className="
            mt-3
            text-center
            text-6xl
            font-bold
            text-white
          "
        >
          {
            booking.carsAhead
          }
        </Text>

      </View>

      {/* Status */}

      <View
        className="
          mt-8
          rounded-2xl
          bg-white
          p-5
        "
      >

        <Text
          className="
            text-lg
            font-semibold
          "
        >
          Status
        </Text>

        <Text
          className="
            mt-2
            text-2xl
            font-bold
            text-primary
          "
        >
          {
            booking.status
          }
        </Text>

      </View>

    </View>
  );
}