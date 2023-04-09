const {v4: uuid} = require('uuid')
const { DB } = require('./connectDb');
const dbFunctions = require('./functions.model')

const getAllDrivers = ()=> dbFunctions.getAll('cardriver')

module.exports= {getAllDrivers}