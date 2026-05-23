

export interface CreateBookingPayload {

  stationId: string;

  fuelTypeId: string;

  guestEmail?: string;

  plateNumber: string;

    userId?: number;
}

export interface Booking {

  fuelTypesId: string;

  plateNumber: string;

  guestEmail?: string;

  userId?: number;

  queueNumber: number;

  bookingNumber: string;

  status: string;
}

export interface BookingResponse {

  booking: Booking;
}