import { create }
from "zustand";

interface BookingState {

  pendingStationId:
    string | null;

  setPendingStation:
    (
      stationId: string
    ) => void;

  clearPendingStation:
    () => void;
}

export const useBookingStore =
  create<BookingState>(
    (set) => ({

      pendingStationId: null,

      setPendingStation:
        (stationId) =>

          set({
            pendingStationId:
              stationId,
          }),

      clearPendingStation:
        () =>

          set({
            pendingStationId:
              null,
          }),
}));