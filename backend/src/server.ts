import express from 'express'
import authRoutes from '../routes/authRoutes'
import cors from 'cors'
import authMiddleware from '../middleware/authMiddleware';
import usersRoutes from '../routes/usersRoutes';
import keysRoutes from '../routes/keysRoutes';
import globalStatisticsRoutes from '../routes/globalStatisticsRoutes';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 5003

app.post('/migrate', async (req, res) => {
  try {
    // Run Prisma migrate deploy to apply migrations
    exec('npx prisma migrate dev --name init', (err, stdout, stderr) => {
      if (err) {
        return res.status(500).send(`Migration Error: ${stderr}`);
      }
      res.status(200).send(`Migration successful: ${stdout}`);
    });
  } catch (error) {
    res.status(500).send('Error triggering migration');
  }
});

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

