import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB, getSupabase } from "./config/db";
import { findUserByAuthId } from "./models/User";
import { findRequestById } from "./models/Request";

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

app.set("io", io);

io.on("connection", (socket) => {
  socket.on(
    "join_room",
    async (payload: { requestId?: string; token?: string }) => {
      try {
        const { requestId, token } = payload || {};
        if (!requestId || !token) {
          return socket.emit("join_error", "Missing data");
        }

        const { data, error } = await getSupabase().auth.getUser(token);
        if (error || !data.user) {
          return socket.emit("join_error", "Invalid token");
        }

        const user = await findUserByAuthId(data.user.id);
        const request = await findRequestById(requestId);
        if (!user || !request) {
          return socket.emit("join_error", "Not found");
        }

        if (user.role !== "admin" && request.user_id !== user.id) {
          return socket.emit("join_error", "Not allowed");
        }

        socket.join(requestId);
        socket.emit("joined", requestId);
      } catch (err) {
        socket.emit("join_error", "Failed to join");
      }
    }
  );
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