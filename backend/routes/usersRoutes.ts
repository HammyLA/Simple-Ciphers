import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });
    res.json(user?.username);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
