const express = require('express')

const reservas = require('../datos/reservas.json')
const vehiculos = require('../datos/vehiculos.json')


const vehiculosAll = (req, res) => {
    res.status(200).json(vehiculos)
}


const vehiculosBypatente = (req, res) => {
    const patente = req.params.patente
    const idx = vehiculos.findIndex(data => data.patente == patente)
     if(idx>=0){
        res.status(200).json(vehiculos[idx])
     }else{
        res.status(404).json({"Mensaje":"El vehiculo de patente "+patente+" no existe"})
     }
}


const modificarVehiculo = (req, res) =>{
    const cuerpo = req.body
    const patente = req.params.patente
    const idx = vehiculos.findIndex(data => data.patente == patente)
    
       

     if(idx>=0){
        vehiculos[idx].habilitado = cuerpo.habilitado
        vehiculos[idx].capacidad = cuerpo.capacidad
        vehiculos[idx].autonomiaKms = cuerpo.autonomiaKms
        res.status(201).json(vehiculos[idx])
     }else{
        res.status(404).json({"Mensaje":"El vehiculo de patente "+patente+" no existe"})
     }

}


const ingresarVehiculo = (req, res) => {
    const cuerpo = req.body
    const patente = cuerpo.patente
    const capacidad = cuerpo.capacidad
    const autonomia = cuerpo.autonomiaKms
   
    const validar = (parseInt(patente.slice(2,6))).toString().length
    
    

    const busca = vehiculos.findIndex(data=>data.patente==patente)

        if(busca<0){
          if(patente.length == 7 && validar == 3){
            if(capacidad>0 && capacidad<=10){
                if(autonomia>0){
                    const final =  {
                      patente: cuerpo.patente,
                      marca: cuerpo.marca,
                      modelo: cuerpo.modelo,
                      habilitado: false,
                      capacidad: cuerpo.capacidad,
                      autonomiaKms: cuerpo.autonomia
                  }
                      vehiculos.push(final)
                      res.status(201).json({"Mensaje":"Nuevo vehiculo patente "+ patente+" cargado"})
                } else{
                  res.status(400).json({"Mensaje":"Valor autonomia debe ser positivo"})
                }



            }else{
              res.status(400).json({"Mensaje":"Cantidad de personas fuera de rango (1-10)"})
            }
          }else{
              res.status(400).json({"Mensaje":"Patente con menos de 7 digitos o mal formato (XX999XX)"})
          }

        }else{
            res.status(400).json({"Mensaje":"El vehiculo de patente "+patente+" existe"})
        }
}



module.exports = { vehiculosAll , vehiculosBypatente , modificarVehiculo , ingresarVehiculo }