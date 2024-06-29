/*eslint-disable*/


import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/login', data);
      if (response.data.message === 'Login successful') {
        console.log('Login successful!');
        navigate('/selling-item'); 
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <h1>Login User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">User Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            validate: (value) => value.includes('@') || 'Invalid email address',
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            validate: (value) => value.length >= 8 || 'Password must be at least 8 characters',
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={errors.email || errors.password}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
