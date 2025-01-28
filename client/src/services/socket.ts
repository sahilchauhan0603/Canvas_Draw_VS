import { io } from "socket.io-client";

const socket = io('https://drawing-app-git-main-sahil-chauhans-projects-cf9884c2.vercel.app', {
  transports: ['websocket', 'polling'],
});

export default socket