import React, { useState } from 'react'
import './AddItemForm.css'

const AddItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (itemName.trim()) {
      addItem(itemName)
      setItemName('')
    }
  }

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Añadir nuevo elemento"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button type="submit">Añadir</button>
    </form>
  )
}

export default AddItemForm
