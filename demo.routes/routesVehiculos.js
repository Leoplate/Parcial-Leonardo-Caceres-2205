const express = require('express')

const reservas = require('../datos/reservas.json')
const vehiculos = require('../datos/vehiculos.json')
const { vehiculosAll, vehiculosBypatente, modificarVehiculo, ingresarVehiculo } = require('../demo.controllers/controllerVehiculos')

const rutaVehiculos = express.Router()


rutaVehiculos.get('/', vehiculosAll)


rutaVehiculos.get('/:patente', vehiculosBypatente)



rutaVehiculos.put('/:patente', modificarVehiculo)



rutaVehiculos.post('/', ingresarVehiculo)




module.exports = rutaVehiculos