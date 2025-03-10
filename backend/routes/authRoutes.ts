import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../src/prismaClient";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/authtoken", async (req, res) => {
  const { username, id } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    console.log(user)

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: id,
          username: username,
        },
      });
    }

    console.log(user)
    
    const token = jwt.sign({ id: user.id, timestamp: Date.now() }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    console.log("Token: ", token)
    res.json(token);
  } catch (err) {
    res.status(503);
  }
});

export default router;
