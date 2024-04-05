const {v4: uuid} = require('uuid')
const { DB } = require('./connectDb');
const dbFunctions = require('./dBFunctions');

const driverTableName = "car_driver";
const driverColumnsForAdding = [
    "driver_id",
    "user_id",
    "vehicle_id"
  ];

const defaultVehicleId = "04daa784-1dab-4b04-842c-a9a3ff8ae016";

const getAllDrivers = async ()=> dbFunctions.getAll(driverTableName);

const addDriver = async (user_id)=>  {
    const driver_id = uuid();
    const driverDetails = [driver_id, user_id, defaultVehicleId];
    const addingDriver = await dbFunctions.addOne(driverTableName, driverColumnsForAdding, ...driverDetails);
    if (addingDriver) {
        return true;
    }
}

module.exports= {getAllDrivers, addDriver}