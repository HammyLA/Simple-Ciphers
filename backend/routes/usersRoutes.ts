import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });
  console.log(user);
  res.json(user?.username);
});

router.put("/", async (req, res) => {
  const { username } = req.body;
  const user = await prisma.user.update({
    where: {
      id: req.userId,
    },
    data: {
      username: username,
    },
  });
  res.json(user);
});

export default router;
