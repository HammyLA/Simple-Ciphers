import express from "express";
import prisma from "../src/prismaClient";

const router = express.Router();

router.get("/", async (req, res) => {
  const keys = await prisma.key.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(keys);
});

router.post("/", async (req, res) => {
    const { key, cipher } = req.body
    const keyAdded = await prisma.key.create({
        data: {
            key,
            cipher,
            userId: req.userId
        }
    })
    res.json(keyAdded)
})

router.put("/:keyId", async(req, res) => {
    const { key } = req.body
    const { keyId } = req.params
    const updatedKey = await prisma.key.update({
        where: {
            userId: req.userId,
            id: parseInt(keyId)
        },
        data: {
            key: key,
            dateCreated: new Date().toISOString()
        }
    })
    res.json(updatedKey)
})

router.delete("/:keyId", async (req, res) => {
    const { keyId } = req.params;
    await prisma.key.delete({
        where: {
            userId: req.userId,
            id: parseInt(keyId)
        }
    })
    res.status(200).send({message: `Remove Key ${keyId}`})
})

export default router;
