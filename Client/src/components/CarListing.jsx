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
    maxPictures: 1,
    images: []
  });

  const handleChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= vehicleData.maxPictures) {
      setVehicleData({
        ...vehicleData,
        images: files
      });
    } else {
      alert(`You can only upload up to ${vehicleData.maxPictures} images.`);
      e.target.value = null; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (vehicleData.phone.length !== 11) {
      alert('Phone number must be exactly 11 digits.');
      return;
    }

   
    if (vehicleData.model.length < 3) {
      alert('Car model must be at least 3 characters.');
      return;
    }

    
    if (vehicleData.maxPictures < 1 || vehicleData.maxPictures > 10) {
      alert('Max pictures must be between 1 and 10.');
      return;
    }

   
    if (vehicleData.price <= 0) {
      alert('Price must be a positive number.');
      return;
    }

    const formData = new FormData();
    for (const key in vehicleData) {
      if (key !== 'images') {
        formData.append(key, vehicleData[key]);
      }
    }
    vehicleData.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:3000/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response.data.message);
      alert('Vehicle information submitted successfully!');

      setVehicleData({
        model: '',
        price: '',
        phone: '',
        city: '',
        maxPictures: 1,
        images: [],
      });
    } catch (error) {
      console.error('Error submitting vehicle information:', error);
      alert('Error submitting vehicle information. Please try again.');
    }
  };

  return (
    <form className="selling-item-form" onSubmit={handleSubmit}>
      <h1>Selling Item Form</h1>
      
      <label htmlFor="model">Car Model</label>
      <input 
        type="text" 
        id="model" 
        name="model" 
        value={vehicleData.model} 
        onChange={handleChange} 
        required 
        minLength="3"
      />

      <label htmlFor="price">Price</label>
      <input 
        type="number" 
        id="price" 
        name="price" 
        value={vehicleData.price} 
        onChange={handleChange} 
        required 
        min="1"
      />

      <label htmlFor="phone">Phone</label>
      <input 
        type="text" 
        id="phone" 
        name="phone" 
        value={vehicleData.phone} 
        onChange={handleChange} 
        required 
        maxLength="11"
        pattern="\d{11}"
        title="Phone number must be exactly 11 digits."
      />

      <label htmlFor="city">City</label>
      <input 
        type="text" 
        id="city" 
        name="city" 
        value={vehicleData.city} 
        onChange={handleChange} 
        required 
      />

      <label htmlFor="maxPictures">Max Pictures</label>
      <select 
        id="maxPictures" 
        name="maxPictures" 
        value={vehicleData.maxPictures} 
        onChange={handleChange} 
        required
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>

      <label htmlFor="images">Images</label>
      <input 
        type="file" 
        id="images" 
        name="images" 
        onChange={handleImageChange} 
        multiple 
        required 
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SellingItem;
