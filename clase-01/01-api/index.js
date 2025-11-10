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

function mid2(req, res, next) {
    req.datonuevo = 'pase por el mid2'

    next()
}


//app.use(mid1)

app.get('/api/usuarios',mid1, mid2,(req, res) => {
    console.log('entro al servicio', req.datonuevo)
    
    res.status(200).json(usuarios)
})

app.get('/otracosa', (req, res) => {
    res.send('que haces aca?')
})

app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})