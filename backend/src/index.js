const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const timerRoutes = require('./routes/timerRoutes')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/timer', timerRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log( `Server running on port ${PORT}`))