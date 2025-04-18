import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await prisma.globalStatistics.findMany();
  res.json(response);
});

router.post("/encrypt/:ciphername", async (req, res) => {
  const { ciphername } = req.params;
  try {
    const response = await prisma.globalStatistics.upsert({
        where: {
            cipher: ciphername
        },
        update: {
            encrypts: {increment: 1}
        },
        create: {
            cipher: ciphername,
            encrypts: 1
        }
    });
    res.status(200)
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/decrypt/:ciphername", async (req, res) => {
    const { ciphername } = req.params;
    try {
      const response = await prisma.globalStatistics.upsert({
          where: {
              cipher: ciphername
          },
          update: {
              decrypts: {increment: 1}
          },
          create: {
              cipher: ciphername,
              decrypts: 1
          }
      });
      res.status(200)
    } catch (err) {
      console.log(err.message);
    }
  });

export default router;
