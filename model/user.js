const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
    name: {
        type: String,
        minlength:3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('please enter a valid Email')
            }
        }
    }
})


module.exports = User