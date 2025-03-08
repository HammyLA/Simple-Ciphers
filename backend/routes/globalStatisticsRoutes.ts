import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

/**
 * TODO -- Create routes for getting and setting global statistics data, DO NOT make a route for each statistic, take a parameter of which statistic is being updated from the frontend
 * If the parameter matches the field in the database it should be incremented or updated or whatever it should be.
 * Likely most of them are going to be sets for individual statistics (to increment them) or gets for all statistics.
 */

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
