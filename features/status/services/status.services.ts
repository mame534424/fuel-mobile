import api
from "@/services/api.token";

export async function getActiveBooking() {

  const response =
    await api.get(
      "/bookings/me"
    );

  return response.data;
}