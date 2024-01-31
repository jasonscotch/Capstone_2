import React, { useState } from 'react';
// import './Inventory.css';

const Inventory = ({ inventoryItems, setInventoryItems }) => {
  //const [items, setItems] = useState(['Map']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setInventoryItems([...inventoryItems, newItem]);
      setNewItem('');
    }
  };

  const editItem = (index, editedValue) => {
    const updatedItems = [...inventoryItems];
    updatedItems[index] = editedValue;
    setInventoryItems(updatedItems);
  };

  return (
    <div className='inventory'>
      <h3>Inventory</h3>
      <ul>
        {inventoryItems.map((item, index) => (
          <li key={index} onClick={() => {
            const editedValue = prompt('Edit item:', item);
            if (editedValue !== null) {
              editItem(index, editedValue);
            }
          }}>
            {item.item_name} - {item.effect_name}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Type item name..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Inventory;
