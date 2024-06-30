const Vehicle = require('../models/vehicle.model');

exports.createVehicle = async (req, res) => {
  try {
    const { model, price, phone, city, maxPictures } = req.body;

    if (model.length < 3) {
      return res.status(400).json({ message: 'Car model must be at least 3 characters' });
    }

    const userId = req.session.userId; 
    const images = req.files ? req.files.map(file => file.path) : [];

    const vehicle = new Vehicle({ model, price, phone, city, maxPictures, pictures: images, userId });

    await vehicle.save();
    res.json({ message: 'Vehicle information submitted successfully' });
  } catch (error) {
    console.error('Error submitting vehicle information:', error);

   
    if (error.name === 'ValidationError') { 
      res.status(400).json({ message: 'Validation error: ' + error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
