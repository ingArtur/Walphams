import React, { useState } from 'react';

function DeleteProduct() {
  const [productId, setProductId] = useState('');

  const handleDelete = () => {
    // Aquí puedes agregar la lógica para eliminar el producto
    console.log(`Producto con ID ${productId} eliminado`);
    // También puedes llamar a una API o método para eliminar el producto
  };

  return (
    <div>
      <h2>Eliminar Producto</h2>
      <input 
        type="text" 
        placeholder="Ingrese ID del Producto" 
        value={productId} 
        onChange={(e) => setProductId(e.target.value)} 
      />
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

export default DeleteProduct;
