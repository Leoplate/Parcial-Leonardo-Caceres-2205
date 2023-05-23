const express = require('express')

//const reservas = require('../datos/reservas.json')
//const vehiculos = require('../datos/vehiculos.json')
const { reservasAll, reservasByID, borrarReserva, ingresarReserva } = require('../demo.controllers/controllerReservas')

const rutaReserva = express.Router()


rutaReserva.get('/', reservasAll)


rutaReserva.get('/:id', reservasByID)


rutaReserva.delete('/:id', borrarReserva)


rutaReserva.post('/', ingresarReserva)



module.exports = rutaReserva