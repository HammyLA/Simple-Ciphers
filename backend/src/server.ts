import express from 'express'
import authRoutes from '../routes/authRoutes'
import cors from 'cors'
import authMiddleware from '../middleware/authMiddleware';
import usersRoutes from '../routes/usersRoutes';
import keysRoutes from '../routes/keysRoutes';
import globalStatisticsRoutes from '../routes/globalStatisticsRoutes';

const app = express();
const PORT = process.env.PORT || 5003

// Middleware to have the server use json
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    console.log("The frontend has successfully contacted the backend")
})


app.use('/auth', authRoutes)
app.use('/users', authMiddleware, usersRoutes)
app.use('/keys', authMiddleware, keysRoutes)
app.use('/globalstats', globalStatisticsRoutes)

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`)
})

