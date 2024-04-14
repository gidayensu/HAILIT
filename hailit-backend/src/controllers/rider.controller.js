const riderService = require('../services/rider.service')

const getAllRiders = async (req, res)=> {
    try  {
        const allRiders = await riderService.getAllRiders();
        if (res && res.status) {
            res.status(200).json({message: 'OK', data: allRiders})
        }
    } catch (error) {
        
        if (res && res.status) {
            res.status(500).json({message: 'ERROR', data: 'server error'})
        }
    }
}

const getOneRider = async (req, res)=> {
    const {rider_id} = req.params;
    try {
        const data = await riderService.getOneRider(rider_id);
        console.log('data:', data)
        if (!data.message) {
            res.status(200).json({data: data})
        } else {
            res.status(400).json({message: data.message})
        }
    } catch (err) {
        return {message: `Error occurred getting rider: ${err}`}
    }
}

const addRider = async (req, res)=> {
    const {user_id, vehicle_id} = req.body;
    const riderAdd = await riderService.addRider(user_id, vehicle_id);
    if(riderAdd) {
        res.status(200).json({message: "rider added"});
    } else {
        res.status(400).json({message: "rider not added"})
    }
}

const updateRider = async(req, res)=> {
    console.log('this is running')
    const {rider_id} = req.params || riderId;
    const {vehicle_id} = req.body || vehicleId;

    const riderDetails = {rider_id, vehicle_id}

    if (!rider_id && !vehicle_id ) {
        return res.status(401).json({message: "rider id or vehicle id missing"});
    }

    try {
        const riderUpdate = await riderService.updateRider(riderDetails);
        if (!riderUpdate.message) {
            res.status(200).json({message: riderUpdate})
        } else {
            res.status(400).json({message: "rider details not updated"});
        }

    } catch (err) {
        return res.status(500).json({message: `Error occurred in updating rider: ${err}`})
    }
}

const deleteRider = async(req, res)=> {
    const {rider_id} = req.params;
    const riderDelete = await riderService.deleteRider(rider_id);
    if (riderDelete) {
        res.status(200).json({message: "rider deleted"});
    } else {
        res.status(400).json({message: "rider not deleted"})
    }

}
module.exports={getAllRiders, getOneRider, addRider, updateRider, deleteRider}

