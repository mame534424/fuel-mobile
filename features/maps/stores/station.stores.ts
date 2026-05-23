import { create } from "zustand";
import { Station } from "../types/station.types";



interface StationStore {

  stationDetails:
    Station | null;

  setStationDetails:
    (
      station: Station
    ) => void;

  clearStationDetails:
    () => void;
}

export const useStationStore =
  create<StationStore>(
    (set) => ({

      stationDetails: null,

      setStationDetails:
        (station) =>

          set({
            stationDetails:
              station,
          }),

      clearStationDetails:
        () =>
          set({
            stationDetails:
              null,
          }),
    })
  );