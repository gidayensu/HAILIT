const riderService = require("../services/rider.service");

const getAllRiders = async (req, res) => {
  try {
    const allRiders = await riderService.getAllRiders();
    if(allRiders.error) {
      return res.status(200).json({ error: allRiders.error });
    }
    if (res && res.status) {
      res.status(200).json({ riders: allRiders });
    }
  } catch (error) {
    if (res && res.status) {
      res.status(500).json({ error: "ERROR", data: "server error" });
    }
  }
};

const getOneRider = async (req, res) => {
  const { rider_id } = req.params;
  try {
    const rider = await riderService.getOneRider(rider_id);
    
    if (rider.error) {
      res.status(200).json({ error: rider.error });
    } 
      res.status(400).json({ rider });
    
  } catch (err) {
    return { error: `Error occurred getting rider: ${err}` };
  }
};

//RIDER NOT ADDED BECAUSE RIDERS WILL BE ADDED THROUGH THE USER ROUTE

// const addRider = async (req, res) => {
//   const { user_id, vehicle_id } = req.body;
//   const riderAdd = await riderService.addRider(user_id, vehicle_id);
//   if (riderAdd.error) {
//     return res.status(200).json({ error: riderAdd.error });
//   }
  
//     res.status(200).json({ rider: "rider added" });
  
// };

const updateRider = async (req, res) => {
  const { rider_id } = req.params ;
  const { vehicle_id } = req.body ;

  
  if (!rider_id && !vehicle_id) {
    return res.status(401).json({ error: "rider id or vehicle id missing" });
  }
  const reqBody = req.body;
  const riderDetails = {...reqBody, rider_id}

  try {
    const riderUpdate = await riderService.updateRider(riderDetails);
    if (!riderUpdate.error) {
      res.status(200).json({ rider: riderUpdate });
    } else {
      res.status(400).json({ error: "rider details not updated" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Error occurred in updating rider: ${err}` });
  }
};

const deleteRider = async (req, res) => {
  try {
    const { rider_id } = req.params;
    const riderDelete = await riderService.deleteRider(rider_id);
    if (riderDelete) {
      res.status(200).json({ success: "rider deleted" });
    } else {
      res.status(400).json({ error: "rider not deleted" });
    }
  } catch (err) {
    return {error:"Error Occurred; Rider Not Deleted"};
  }
};
module.exports = {
  getAllRiders,
  getOneRider,
  // addRider,
  updateRider,
  deleteRider,
};
