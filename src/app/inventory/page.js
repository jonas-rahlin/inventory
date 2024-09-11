"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InventoryItem from '../../components/InventoryItem';
import InventoryForm from '../../components/InventoryForm'; 
import '../../../styles/inventory.css';

//Generate Inventory Page
function InventoryPage() {

  //
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  //Set Routing function
  const router = useRouter();

  
  useEffect(() => {
    //Check for JWT
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      //If no token exists, send user back to Login page
      if (!token) {
        router.push('/login');
        return;
      }

      //Check JWT Authentication
      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        //If authentication is okay, show item. Else send User back to Login Page.
        if (!response.ok) {
          router.push('/login');
        } else {
          fetchItems();
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch inventory items function
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

  //Update Items after new Item creation
  const handleSave = () => {
    //Update Inventory
    fetchItems();
    setEditingItem(null);
  };

  //Set Selected Item to Edit
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  //Delete Item
  const handleDelete = async (id) => {
    try {
      //Find selected Item then Delete
      const response = await fetch(`/api/inventory?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //Update Inventory
      fetchItems();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  //Logout User Function
  const handleLogout = () => {
    //Clear Local Storage and send User to Login Page
    localStorage.clear();
    router.push('/login');
  };

  return (
    //Generate Html
    <div>
      <nav>
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </nav>

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
