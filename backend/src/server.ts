import express from 'express'

const app = express();
const PORT = process.env.PORT || 5003

// Middleware to have the server use json
app.use(express.json())



app.get('/', (request, response) => {
    console.log("The frontend has successfully contacted the backend")
})
app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`)
})

