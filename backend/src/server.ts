import express from 'express'

const app = express();
const PORT = process.env.port || 5000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`)
})