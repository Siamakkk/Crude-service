const mongoose = require('mongoose')
//making the conection to database
mongoose.connect('mongodb://127.0.0.1:27042/interview', {
    useNewUrlParser: true,
    useCreateIndex: true
})

