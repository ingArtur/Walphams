import React, { useState } from 'react'
import './ItemList.css'
import AddItemForm from './AddItemForm'

const ItemList = () => {
  const [items, setItems] = useState(['Elemento 1', 'Elemento 2', 'Elemento 3'])

  const addItem = (itemName) => {
    setItems([...items, itemName])
  }

  return (
    <div className="item-list">
      <h2>Lista de Elementos</h2>
      <AddItemForm addItem={addItem} />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ItemList
