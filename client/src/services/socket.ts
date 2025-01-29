import { io } from "socket.io-client";

const socket = io('https://canvas-draw-backend.onrender.com', {
  transports: ['websocket', 'polling'],
});

export default socket