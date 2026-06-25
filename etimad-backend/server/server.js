import app from "./app.js";
import connectDB from "./config/db.js";
import { Server } from "socket.io";

connectDB();

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () =>
  console.log("Server running")
);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.conversationId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});