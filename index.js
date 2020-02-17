//import requirements
const express = require('express')
require('./db/mongoos')
// user model
const User = require('./model/user')

//start our express app
const app = express()
const port = 3000

//parse json data reciving
app.use(express.json())

//update operation
app.patch('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true , runValidators: true})

        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

//delete operation 
app.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(`the user deleted successfully`)

    } catch(err) {
        res.status(500).send(err)
    } 
})

// read operation for finding a specefic Data
app.get('/users/:id', async (req, res) => {
    try { 
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user){
            return res.send(404).send()
        }
        res.send(user)
    }catch (err) {
        res.status(500).send(err.message)
    }
})

//read operation for showing all Data
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send(err)
    }
})




//create operation
app.post('/users', async (req, res) => {
    // console.log(req.body)
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(err) {
        res.status(400).send(err)
    }
})

app.listen(port, () => console.log(`server is on port ${port}`))