"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust if necessary
import InventoryItem from '../../components/InventoryItem';
import InventoryForm from '../../components/InventoryForm'; 
import '../../../styles/inventory.css';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // State for editing item
  const router = useRouter(); // For redirection

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token found, redirect to login
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        console.log(token);

        if (!response.ok) {
          // Token is invalid or expired, redirect to login
          router.push('/login');
        } else {
          fetchItems(); // Fetch items only if token is valid
        }
      } catch (error) {
        // Error occurred, redirect to login
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/inventory');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  const handleSave = () => {
    fetchItems(); // Refresh items after save
    setEditingItem(null); // Clear editing item after save
  };

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/inventory?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchItems(); // Refresh items after deletion
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      <InventoryForm item={editingItem} onSave={handleSave} />
      <ul id="inventory-display">
        {items.map(item => (
          <InventoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            quantity={item.quantity}
            category={item.category}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default InventoryPage;
