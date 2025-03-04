import express from "express"
import bcrypt from 'bcryptjs'
import prisma from "../src/prismaClient"
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/register", async (req, res) => {

    // Extract the username, email and password
    const {username, email, password} = req.body

    // Hash the password to hide from outside eyeballs
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router