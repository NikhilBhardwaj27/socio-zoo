const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const app = express()

// configuring dotenv 
dotenv.config()

// db connection method
const dbConnect = async() =>{    
    try {
        await mongoose.connect(
        process.env.MONGO_URI, 
        { useUnifiedTopology: true,useNewUrlParser: true })

        console.log('Connected to database')
    }catch(error){
         throw  error
    }
}

// calling dbConnect method
dbConnect()

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
require('./server/config/passport')(passport)


// Defining routes
app.use('/api/posts',require('./server/routes/api/posts'))
app.use('/api/profiles',require('./server/routes/api/profiles'))
app.use('/api/users',require('./server/routes/api/users'))



// If app is running in production then do this
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}


// Setting up PORT number
const PORT = process.env.PORT || 8000


app.get('/',(req,res)=>{
    res.send('Server is running')
})
app.listen(PORT,(req,res)=>{
    console.log(`Running on port ${PORT}`)
})