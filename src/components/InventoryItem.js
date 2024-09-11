import React from 'react';

function InventoryItem({ id, name, description, quantity, category, onDelete, onEdit }) {
  return (
    <li id={`item-${id}`} className="inventory-item">
      <span className="item-id">ID: {id}</span>
      <h2 className="item-name">{name}</h2>
      <p className="item-description">{description}</p>
      <span className="item-quantity">Quantity: {quantity}</span>
      <span className="item-category">Category: {category}</span>
      <button className="edit-button" onClick={onEdit}>Edit</button>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </li>
  );
}

export default InventoryItem;
