import express from 'express'
import mongoose from 'mongoose'

import userRouter from './src/routes/usuarios.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// conexion a mongo
mongoose.connect('mongodb://localhost:27017/users-test', {})

app.use('/api/usuarios', userRouter)

app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})