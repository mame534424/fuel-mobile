import { z } from "zod";

export const bookingSchema =
  z.object({

    plateNumber:
      z.string()
       .min(
         3,
         "Plate number required"
       ),

    fuelTypeId:
      z.number({
        required_error:
          "Select fuel type",
      }),
});