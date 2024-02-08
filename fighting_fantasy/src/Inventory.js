import React, { useState } from 'react';
// import './Inventory.css';

const Inventory = ({ inventoryItems, setInventoryItems }) => {
  //const [items, setItems] = useState(['Map']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject = { item_name: newItem, effect_name: 'normal' };
      setInventoryItems([...inventoryItems, newItemObject]);
      setNewItem('');
    }
  };

  const editItem = (index, editedValue) => {
    const updatedItems = [...inventoryItems];
    updatedItems[index] = editedValue;
    setInventoryItems(updatedItems);
  };

  return (
    <div className='inventory' style={{maxHeight: '20vh', overflowY: 'auto' }}>
      <h4>Inventory</h4>
      <ul>
        {inventoryItems.map((item, index) => (
          <li key={index} onClick={() => {
            const editedValue = prompt('Edit item:', item);
            if (editedValue !== null) {
              editItem(index, editedValue);
            }
          }}>
            <strong>{item.item_name}</strong> - {item.description || item.effect_name}
          </li>
        ))}
      </ul>
      <div className='rpgui-container framed-grey'>
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
