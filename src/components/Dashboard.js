import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBox, FaMapMarkerAlt, FaTags, FaShoppingCart, FaTruck, FaSignOutAlt, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import './Dashboard.css';

function Dashboard() {
  const [isClientsSubmenuOpen, setIsClientsSubmenuOpen] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ id: '', nombre: '', stock: '', precio: '', createdAt: new Date().toISOString() });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = () => {
      const data = [
        { id: 25, nombre: 'Chocolates', stock: 100, precio: 2000, createdAt: '2021-07-16T18:16:13.000000Z' },
        { id: 5, nombre: 'Pruebas productos', stock: 1991, precio: 1000, createdAt: '2021-06-07T15:03:17.000000Z' },
        { id: 2, nombre: 'Galletas', stock: 911, precio: 10000, createdAt: '2021-06-04T18:32:34.000000Z' },
        { id: 1, nombre: 'Galletas de chocolate2', stock: 70, precio: 100, createdAt: '2021-05-24T14:43:35.000000Z' },
      ];
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  const toggleClientsSubmenu = () => {
    setIsClientsSubmenuOpen(!isClientsSubmenuOpen);
  };

  const toggleProductsSubmenu = () => {
    setIsProductsSubmenuOpen(!isProductsSubmenuOpen);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)));
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    alert(`Producto con ID: ${id} eliminado`);
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: products.length ? products[products.length - 1].id + 1 : 1 }]);
    setNewProduct({ id: '', nombre: '', stock: '', precio: '', createdAt: new Date().toISOString() });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dashboard-container">
      <div className="sidenav">
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <div className="menu-item" onClick={toggleClientsSubmenu}>
                <FaUser /> Clientes {isClientsSubmenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {isClientsSubmenuOpen && (
                <ul className="submenu">
                  <li>
                    <Link to="/dashboard/clients/list">Lista de Clientes</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/clients/add">Agregar Cliente</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/clients/import">Importar Clientes</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div className="menu-item" onClick={toggleProductsSubmenu}>
                <FaBox /> Productos {isProductsSubmenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {isProductsSubmenuOpen && (
                <div className="product-table">
                  <h2>Productos</h2>
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Buscar producto..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <form className="new-product-form" onSubmit={handleAddProduct}>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre del producto"
                      value={newProduct.nombre}
                      onChange={handleAddProductChange}
                      required
                    />
                    <input
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={handleAddProductChange}
                      required
                    />
                    <input
                      type="number"
                      name="precio"
                      placeholder="Precio"
                      value={newProduct.precio}
                      onChange={handleAddProductChange}
                      required
                    />
                    <button type="submit">Agregar Producto</button>
                  </form>
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Created at</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.nombre}</td>
                          <td>
                            {editingProduct && editingProduct.id === product.id ? (
                              <input
                                type="number"
                                name="stock"
                                value={editingProduct.stock}
                                onChange={handleChange}
                              />
                            ) : (
                              product.stock
                            )}
                          </td>
                          <td>
                            {editingProduct && editingProduct.id === product.id ? (
                              <input
                                type="number"
                                name="precio"
                                value={editingProduct.precio}
                                onChange={handleChange}
                              />
                            ) : (
                              product.precio
                            )}
                          </td>
                          <td>{new Date(product.createdAt).toLocaleString()}</td>
                          <td>
                            {editingProduct && editingProduct.id === product.id ? (
                              <button className="btn btn-sm btn-success" onClick={handleSave}>Guardar</button>
                            ) : (
                              <button className="btn btn-sm btn-primary" onClick={() => handleEdit(product)}>✏️</button>
                            )}
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
            <li>
              <Link to="/dashboard/locations">
                <FaMapMarkerAlt /> Ubicaciones
              </Link>
            </li>
            <li>
              <Link to="/dashboard/categories">
                <FaTags /> Categorías
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders">
                <FaShoppingCart /> Pedidos
              </Link>
            </li>
            <li>
              <Link to="/dashboard/providers">
                <FaTruck /> Proveedores
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
      <div className="main-content">
        <h1>Bienvenido al Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
