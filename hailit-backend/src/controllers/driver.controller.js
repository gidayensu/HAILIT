const driverService = require("../services/driver.service");

const getAllDrivers = async (req, res) => {
  try {
    const allDrivers = await driverService.getAllDrivers();
    if (res && res.status) {
      res.status(200).json({ message: "OK", data: allDrivers });
    }
  } catch (error) {
    if (res && res.status) {
      res.status(500).json({ message: "ERROR", data: "server error" });
    }
  }
};

const getOneDriver = async (req, res) => {
  const { driver_id } = req.params;
  try {
    const data = await driverService.getOneDriver(driver_id);
    if (!data.message) {
      res.status(200).json({ data: data });
    } else {
      res.status(400).json({ message: "Driver not found:" });
    }
  } catch (err) {
    return { message: `Error occurred getting driver: ${err}` };
  }
};

const addDriver = async (req, res) => {
  const { user_id, vehicle_id } = req.body;
  const driverAdd = await driverService.addDriver(user_id, vehicle_id);
  if (driverAdd) {
    res.status(200).json({ message: "driver added" });
  } else {
    res.status(400).json({ message: "driver not added" });
  }
};

const updateDriver = async (req, res) => {
  const { driver_id } = req.params;
  const { vehicle_id } = req.body;

  const driverDetails = { driver_id, ...req.body };

  if (!driver_id && !vehicle_id) {
    return res.status(401).json({ message: "driver id or vehicle id missing" });
  }

  try {
    const driverUpdate = await driverService.updateDriver(driverDetails);
    if (!driverUpdate.message) {
      res.status(200).json({ message: driverUpdate });
    } else {
      res.status(400).json({ message: "driver details not updated" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error occurred in updating driver: ${err}` });
  }
};

const deleteDriver = async (req, res) => {
  const { driver_id } = req.params;
  const driverDelete = await driverService.deleteDriver(driver_id);
  if (driverDelete) {
    res.status(200).json({ message: "driver deleted" });
  } else {
    res.status(400).json({ message: "driver not deleted" });
  }
};
module.exports = {
  getAllDrivers,
  getOneDriver,
  addDriver,
  updateDriver,
  deleteDriver,
};
