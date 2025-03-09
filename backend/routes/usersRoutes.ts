import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
    const { sub, nickname } = req.body
    const user = await prisma.user.findFirst({
      where: {
        id: sub,
        username: nickname
      },
    });
    res.json(user?.username);
});

export default router;
