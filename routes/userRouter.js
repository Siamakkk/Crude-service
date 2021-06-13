// user model
const User = require('../model/user')
const userRouter = require('express').Router()


//create operation
userRouter.post('/users', async (req, res) => {
  // console.log(req.body)
  const user = new User(req.body)
  try{
      await user.save()
      res.status(201).send(user)
  } catch(err) {
      res.status(400).send(err)
  }
})

// read operation for finding a specefic Data
userRouter.get('/users/:id', async (req, res) => {
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
userRouter.get('/users', async (req, res) => {
  try {
      const users = await User.find({})
      res.status(200).send(users)
  } catch (err) {
      res.status(400).send(err)
  }
})

//update operation
userRouter.patch('/users/:id', async (req, res) => {
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
userRouter.delete('/users/:id', async (req, res) => {
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

module.exports = userRouter