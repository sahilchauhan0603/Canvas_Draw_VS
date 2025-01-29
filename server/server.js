// index.js
import app from "./app.js";
import { config } from "dotenv";
import http from "http";
import { Server } from "socket.io";

// Load environment variables
config({ path: "./config/config.env" });

// socket
const server = http.createServer(app);
const io = new Server(server, {
  // Initialize socket.io
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log('User connected with ID:', socket.id);

    console.log('A user connected:', socket.id);

    socket.on('sendMessage', ({ room, sender, text }) => {
      console.log(`Message received in room ${room}: ${text}`);

      // Broadcast the message to others in the room
      const message = { sender, text };
      socket.to(room).emit('receiveMessage',message );
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });


  // Handle room joining
  socket.on("join-room", (room) => {
    socket.join(room); //join the room
    console.log(`User with (ID: ${socket.id}) joined room: ${room}`); // Log the user and their room
  });

  // Draw line
  socket.on("draw line", ({ currentPoint, prevPoint, color, room }) => {
    socket.to(room).emit("draw line", { currentPoint, prevPoint, color });
  });

  // Draw circle
  socket.on("draw circle", ({ startPoint, endPoint, color, room }) => {
    socket.to(room).emit("draw circle", { startPoint, endPoint, color });
  });

  // Draw rectangle
  socket.on("draw-rectangle", ({ startPoint, endPoint, color, room }) => {
    socket.to(room).emit("draw-rectangle", { startPoint, endPoint, color });
  });

  // Client ready state
  socket.on("client-ready", (room) => {
    if (room) {
      socket.to(room).emit("get-canvas-state");
      console.log("Requesting canvas state from client in room:", room);
    }
  });

  // Canvas state updates
  socket.on("canvas-state", ({ room, state }) => {
    socket.to(room).emit("canvas-state-from-server", state);
  });

  // Clear canvas
  socket.on("clear-all", (room) => {
    if (!room) {
      console.error("Invalid room");
      return;
    }
    console.log(`Clear canvas request received for room: ${room}`);
    io.in(room)
      .allSockets()
      .then((sockets) => {
        if (sockets.size === 0) {
          console.log(`No clients in room ${room} to clear canvas.`);
          return;
        }
        io.to(room).emit("clear-all-from-server");
        console.log(`Clear canvas event emitted to room: ${room}`);
      })
      .catch((error) => {
        console.error(`Error handling clear canvas for room ${room}:`, error);
      });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", socket.id);
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
