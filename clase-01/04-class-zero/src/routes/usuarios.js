import { Router } from "express";

import { usuario } from "../models/usuarios.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const usuarios = await usuario.find()
        res.status(200).json(usuarios)
    } catch (err) {
        res.status(500).send('error interno')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const user = await usuario.findById(id)
        if (!user) return res.status(404).send('usuario no encontrado')
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const { name, age, email } = req.body
    if (!name || !age || !email) {
        return res.status(400).send('error, faltan datos')
    }

    try {
        const nuevoUsuario = new usuario({name, age, email})
        await nuevoUsuario.save()

        res.status(201).json({message: 'Creado correctamente', usuario: nuevoUsuario})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newData = req.body

    try {
        const userUpdated = await usuario.findByIdAndUpdate(id, newData)
        if (!userUpdated) return res.status(404).send('usuario no encontrado')

        res.status(201).json({message: 'Actualizado correctamente', usuario: userUpdated})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const userDeleted = await usuario.findByIdAndDelete(id)
        if (!userDeleted) return res.status(404).send('usuario no encontrado')

        res.status(201).json({message: 'Eliminado correctamente', usuario: userDeleted})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

export default router