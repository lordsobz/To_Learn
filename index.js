require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

//Ket noi co so du lieu
const connectDB = async () => {
    try{
        await mongoose.connect(
            'mongodb+srv://'+(process.env.DB_USERNAME)+':'+(process.env.DB_PASSWORD)+'@learningweb.klojq.mongodb.net/LearningWeb?retryWrites=true&w=majority', 
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
        console.log('MongoDB connected')
    } catch(error){
        console.log(error.message)
        process.exit(1)
    }
}


connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = 4000

app.listen(PORT, () => console.log('Server started on port '+(PORT)))
