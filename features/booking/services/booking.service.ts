import api
from "@/services/api";

import {
  CreateBookingPayload,
} from "../types/booking.types";

export const createBooking =
  async (
    payload:
      CreateBookingPayload
  ) => {

    const response =
      await api.post(
        "/bookings",
        payload
      );

    return response.data;
};