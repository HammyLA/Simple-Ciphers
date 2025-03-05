import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../src/prismaClient";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  // Extract the username, email and password
  const { username, email, password } = req.body;

  // Hash the password to hide from outside eyeballs
  const salt = 10;
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const salt = 10;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    console.log(password, user.password)
    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword)
    if (!validPassword) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }
    console.log(user);

    // Successful authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
