import { io } from "socket.io-client";

const socket = io('https://drawing-app-lilac.vercel.app', {
  transports: ['websocket', 'polling'],
});

export default socket