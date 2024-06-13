import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pedidos'));
        const pedidosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPedidos(pedidosList);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="pedidos-container">
      <h1 className="pedidos-title">Lista de Pedidos</h1>
      <table className="pedidos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Fecha de Pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.producto}</td>
              <td>{pedido.cantidad}</td>
              <td>{pedido.estado}</td>
              <td>{new Date(pedido.fechaPedido).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedidos;
