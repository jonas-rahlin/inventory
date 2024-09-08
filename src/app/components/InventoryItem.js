function InventoryItem({ id, name, description, quantity, category }) {
    return (
      <li id={`item-${id}`} className="inventory-item">
        <span className="item-id">{id}</span>
        <h2 className="item-name">{name}</h2>
        <p className="item-description">{description}</p>
        <span className="item-quantity">Quantity: {quantity}</span>
        <span className="item-category">Category: {category}</span>
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </li>
    );
  }
  
  export default InventoryItem;
  