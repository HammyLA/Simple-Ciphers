import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });
    res.json(user?.username);
});

export default router;
