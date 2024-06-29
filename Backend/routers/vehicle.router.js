const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require('../middleware/auth.middleware');
console.log("datacome in router")
router.post('/', authMiddleware, vehicleController.createVehicle); 

module.exports = router;
