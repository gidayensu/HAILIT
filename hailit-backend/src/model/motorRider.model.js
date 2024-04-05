const {v4: uuid} = require('uuid')

const dbFunctions = require('./dBFunctions');

const riderTableName = "motor_rider";
const riderColumnsForAdding = [
    "rider_id",
    "vehicle_id",
    "user_id"
  ];

const defaultVehicleId = "04daa784-1dab-4b04-842c-a9a3ff8ae016";

const getAllMotors = async ()=> dbFunctions.getAll(riderTableName);

const addMotorRider = async (user_id)=>  {
    const rider_id = uuid();
    const riderDetails = [rider_id, defaultVehicleId, user_id ];
    const addingMotor = await dbFunctions.addOne(riderTableName, riderColumnsForAdding, ...riderDetails);
    if (addingMotor) {
        return true;
    }
}

module.exports= {getAllMotors, addMotorRider}