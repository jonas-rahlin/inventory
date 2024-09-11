'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
  
    // Common validation: Ensure email and password are filled for both login and registration
    if (!formData.email || !formData.password) {
      alert('Email and password are required');
      return;
    }
  
    // Additional validation for registration: Ensure name is filled
    if (action === 'register' && !formData.name) {
      alert('Name is required for registration');
      return;
    }
  
    const endpoint = action === 'login' ? '/api/login' : '/api/register';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.error}`);
        return;
      }
  
      const data = await response.json();
      if (action === 'login') {
        localStorage.setItem('token', data.token); // Store JWT token in local storage
        router.push('/inventory');
        alert('Login successful');
      } else {
        alert('Registration successful');
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  

  return (
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
