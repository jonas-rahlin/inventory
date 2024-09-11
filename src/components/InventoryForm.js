import React, { useEffect, useState } from 'react';

//Function for generating Form 
function InventoryForm({ item, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  // Populate form fields if item is provided (for editing)
  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setDescription(item.description || '');
      setQuantity(item.quantity || '');
      setCategory(item.category || '');
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = item ? 'PUT' : 'POST'; // Use PUT for updating and POST for creating
      const url = item ? `/api/inventory/${item.id}` : '/api/inventory';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item ? item.id : undefined, // Include ID only for PUT requests
          name,
          description,
          quantity: parseInt(quantity, 10),
          category,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Item saved successfully:', result);
      onSave(); // Refresh or redirect after saving
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        <span>Description</span>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
      <span>Quantity:</span>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </label>
      <label>
        <span>Category:</span>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>
      <button type="submit">{item ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default InventoryForm;
