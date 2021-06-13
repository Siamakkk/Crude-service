//import requirements
const express = require('express')
require('./db/mongoos')
const userRouter = require('./routes/userRouter')

//start our express app
const app = express()
const port = 3000

//parse json data reciving
app.use(express.json())
app.use(userRouter)


app.listen(port, () => console.log(`server is on port ${port}`))