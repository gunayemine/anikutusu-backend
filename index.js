import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import memoryRouter from './routers/memoryRouter.js'
import userRouter from './routers/userRouter.js'
dotenv.config()

const app = express()

app.use(express.json({ limit : '20mb' }))
app.use(cors({credentials: true, origin: 'https://ani-kutum.netlify.app'}))
app.use(cookieParser())

app.use('/memories', memoryRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT, () =>{
    mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Connection to Db'))
    .catch((err) => console.log(err))
})

