import { io }
from "socket.io-client";

export const socket =
  io(
    "http://10.214.9.140:5001",
    {
      autoConnect: false,
    }
);