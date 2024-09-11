'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

//Generate Login Page
function LoginPage() {
  //Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  //Set routing function
  const router = useRouter();

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //
  const handleSubmit = async (e, action) => {
    //Prevent reload
    e.preventDefault();
  
    //Alert user if form isnt correctly filled out
    if (!formData.email || !formData.password) {
      alert('Email and password are required');
      return;
    }
  
    if (action === 'register' && !formData.name) {
      alert('Name is required');
      return;
    }
  
    //Handle proceeding with Login vs Register
    const endpoint = action === 'login' ? '/api/login' : '/api/register';
  
    try {
      //Send Formdata to Backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      //Error handling
      if (!response.ok) {
        const error = await response.json();
        console.error(`Error: ${error.error}`);
        return;
      }
  
      //Login User and set JWT or Register User based on User Action
      const data = await response.json();
      if (action === 'login') {
        localStorage.setItem('token', data.token);
        router.push('/inventory');
        alert('Login successful');
      } else {
        alert('Registration successful');
      }
  
    } catch (error) {
      //Error Handling
      console.error('Error:', error);
    }
  };
  

  return (
    //Generate Html Elements
    <div>
      <h1>Inventory</h1>
      <form>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="button" onClick={(e) => handleSubmit(e, 'login')}>
          Login
        </button>
        <button type="button" onClick={(e) => handleSubmit(e, 'register')}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
