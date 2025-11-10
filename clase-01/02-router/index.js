import express from 'express'

const app = express()
const PORT = 8080

const usuarios = [
    { nombre: 'diego', apellido: 'larripa' },
    { nombre: 'david', apellido: 'gallo' }
]

function mid1(req, res, next) {
    req.datonuevo = 'pase por el mid1'

    next()
}

app.get('/otracosa', (req, res) => {
    res.send('que haces aca?')
})

// router
const usuariosRouter = express.Router()

usuariosRouter.use(mid1)

usuariosRouter.get('/', (req, res) => {
    console.log('entro al servicio', req.datonuevo)
    
    res.status(200).json(usuarios)
})

app.use('/api/usuarios', usuariosRouter)

app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})