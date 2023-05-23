const express = require('express')
const rutaReserva = require('../demo.routes/routesReservas')
const rutaVehiculos = require('../demo.routes/routesVehiculos')

const app = express()

app.use(express.json())

const PORT = process.env.PORT | 5000

app.listen(PORT, ()=>console.log("WE ARE USING PORT "+PORT))

app.use('/api/reservas', rutaReserva)

app.use('/api/vehiculos',rutaVehiculos )