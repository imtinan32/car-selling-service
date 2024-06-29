const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, vehicleController.createVehicle); // Protected route

module.exports = router;
