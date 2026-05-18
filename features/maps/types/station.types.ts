export interface Fuel {
  fuelTypeId: number;

  fuelTypeName: string;

  quantity: number;

  isAvailable: boolean;

  updatedAt: string;
}

export interface Booking {
  count: string;
}

export interface Station {
  stationId: string;

  stationName: string;

  fuels: Fuel[];

  bookings: Booking[];
}
export interface StationNearby{
    id:string;
    name:string;
    code:string;
    latitude:number;
    longitude:number;
    isActive:boolean;
    ownerId:string;
    createdAt:string;
}
export interface StationNearbyResponse{
    stationNearby:StationNearby[];}