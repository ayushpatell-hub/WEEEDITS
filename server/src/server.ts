import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      process.env.ADMIN_URL || "http://localhost:3001",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room: string) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {});
});

export { io };

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`WEEEDITS server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });