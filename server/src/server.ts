import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import { initFirebase } from "./config/firebase";
import { initCloudinary } from "./config/cloudinary";

const PORT = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    await connectDB();
    initFirebase();
    initCloudinary();

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
      console.log("Socket connected:", socket.id);

      socket.on("join_room", (roomId: string) => {
        socket.join(roomId);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`WEEEDITS server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();