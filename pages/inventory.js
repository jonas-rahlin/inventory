// pages/inventory.js
import { useState, useEffect } from 'react';
import InventoryItem from '../components/InventoryItem'; // Adjust the path if needed

function InventoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/inventory'); // Adjust the API route if needed
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  return (
    <div>
      <h1 id="inventory-title">Inventory</h1>
      <button id="add-item-button" type="button">Add Item</button>
      <ul id="inventory-display">
        {items.map(item => (
          <InventoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;
