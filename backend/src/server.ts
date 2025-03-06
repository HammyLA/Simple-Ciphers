import express from 'express'
import authRoutes from '../routes/authRoutes'
import cors from 'cors'
import authMiddleware from '../middleware/authMiddleware';
import usersRoutes from '../routes/usersRoutes';

const app = express();
const PORT = process.env.PORT || 5003

// Middleware to have the server use json
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    console.log("The frontend has successfully contacted the backend")
})

app.use('/users', authMiddleware, usersRoutes)

app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`)
})

