const express = require('express')

const reservas = require('../datos/reservas.json')
const vehiculos = require('../datos/vehiculos.json')


const reservasAll = (req, res) => {
    res.status(200).json(reservas)
}


const reservasByID = (req, res) => {
    const id = req.params.id
    const idx = reservas.findIndex(data => data.id == id)
     if(idx>=0){
        res.status(200).json(reservas[idx])
     }else{
        res.status(404).json({"Mensaje":"La reserva de codigo "+id+" no existe"})
     }
}


const borrarReserva = (req, res) => {
    const id = req.params.id
    const idx = reservas.findIndex(data => data.id == id)
     if(idx>=0){
        reservas.splice(idx,1)
        res.status(200).json({"Mensaje":"La reserva de codigo "+id+" fue eliminada"})
     }else{
        res.status(404).json({"Mensaje":"La reserva de codigo "+id+" no existe"})
     }
}


const ingresarReserva = (req, res) => {
    const cuerpo = req.body
    const cantPer = cuerpo.cantPersonas
    const distan  = cuerpo.distancia
    const fecha = cuerpo.fecha

    const tabla = reservas.map(data=>data.id) 
    const maximo = tabla.length > 0 ? Math.max(...tabla) + 1 : 1
    
    const condicion = vehiculos.findIndex(data=>data.habilitado && data.capacidad >=cantPer && data.autonomiaKms >= distan)

    

    
    
    if(condicion>=0){
    
        if(cantPer>0 && cantPer<=10){
        if(distan>0 && distan<=500){
            if(fecha.length==8){
                      const final = {
                          id: maximo,
                          cliente: cuerpo.cliente,
                          cantPersonas: cuerpo.cantPersonas,
                          distancia: cuerpo.distancia,
                          vehiculo: {
                            patente: vehiculos[condicion].patente,
                            marca: vehiculos[condicion].marca,
                            modelo: vehiculos[condicion].modelo,
                            habilitado: vehiculos[condicion].habilitado,
                            capacidad: vehiculos[condicion].capacidad,
                            autonomiaKms: vehiculos[condicion].autonomiaKms
                          }
                        }   
        
    
                  reservas.push(final)
                  res.status(200).json({"Mensaje":"La reserva de codigo "+maximo+" fue cargada"})
            }else{
                res.status(400).json({"Mensaje":"Fecha debe tener 8 digitos (AAAAMMDD)"})
            }
        }else{
            res.status(400).json({"Mensaje":"Distancia fuera de rango(1-500)"})
        }

    }else{
        res.status(400).json({"Mensaje":"Cantidad de personas fuera de rango(1-10)"})
    }
    }else{
        res.status(400).json({"Mensaje":"No hay vehiculo habilitado que cumpla las condiciones requeridas"})
    }
    
}


module.exports = { reservasAll , reservasByID , borrarReserva , ingresarReserva}
