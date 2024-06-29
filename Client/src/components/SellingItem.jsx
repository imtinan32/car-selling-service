/*eslint-disable*/

import React, { useState } from 'react';
import axios from 'axios';
import './SellingItem.css';
const SellingItem = () => {
  const [vehicleData, setVehicleData] = useState({
    model: '',
    price: '',
    phone: '',
    city: '',
    maxPictures: ''
  });

  const handleChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/vehicles/create', vehicleData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error submitting vehicle information:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Selling Item Form</h1>
      <label htmlFor="model">Car Model</label>
      <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} required />
      
      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" value={vehicleData.price} onChange={handleChange} required />
      
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" name="phone" value={vehicleData.phone} onChange={handleChange} required />
      
      <label htmlFor="city">City</label>
      <input type="text" id="city" name="city" value={vehicleData.city} onChange={handleChange} required />
      
      <label htmlFor="maxPictures">Max Pictures</label>
      <input type="number" id="maxPictures" name="maxPictures" value={vehicleData.maxPictures} onChange={handleChange} required />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default SellingItem;
