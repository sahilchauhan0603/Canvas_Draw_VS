import { io } from "socket.io-client";

const socket = io('https://drawingapp-backend.onrender.com', {
  transports: ['websocket', 'polling'],
});

export default socket