const carDriverDb = require('../model/carDriver.model')

const getAllDrivers = async ()=> {
    const drivers = await carDriverDb.getAllDrivers();
    return drivers;
}


const getOneDriver = ()=> {

}

const addDriver = ()=> {

}

const updateDriver = ()=> {

}

const deleteDriver = () => {
    
}
module.exports={getAllDrivers, getOneDriver, addDriver, updateDriver, deleteDriver}