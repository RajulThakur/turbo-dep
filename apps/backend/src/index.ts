import { prisma } from "@repo/db/client";
import express from "express";
const app = express();
const PORT = 3001;
app.get("/", async (req, res) => {
  const data = await prisma.user.findMany();
  res.status(200).json({ data, status: "success" });
});

app.post("/", async (req, res) => {
  const username = `${Math.random()}-user`;
  const password = `${Math.random()}-password`;
  const data = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(200).json({ data, status: "success" });
});
app.get("/todo", async (req, res) => {
  const data = await prisma.todo.findMany();
  res.status(200).json({ data, status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
