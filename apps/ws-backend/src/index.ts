import { prisma } from "@repo/db/client";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", async (message: Buffer) => {
    try {
      const messageText = message.toString();
      await prisma.todo.create({
        data: {
          title: messageText,
          isDone: false,
        },
      });
      ws.send(`Pong - ${messageText}`);
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send("Error occurred while processing your message");
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

process.on("SIGTERM", () => {
  console.log("Closing WebSocket server");
  wss.close();
  process.exit(0);
});
