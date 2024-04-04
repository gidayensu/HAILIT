const {v4: uuid} = require('uuid')
const { DB } = require('./connectDb');
const dbFunctions = require('./dBFunctions')

const getAllDrivers = ()=> dbFunctions.getAll('cardriver')

module.exports= {getAllDrivers}