import { io }
from "socket.io-client";

export const socket =
  io(
    "https://fuel-system-2qw7.onrender.com",
    {
      autoConnect: false,
    }
);