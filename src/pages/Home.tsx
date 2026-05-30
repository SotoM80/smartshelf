
import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";


import { useForm } from "react-hook-form"; 

interface SearchFormData {
  query: string;
}

export default function Home() {
  const context = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState("");

  useDocumentTitle("Home");

  // 2. INICIALIZACIÓN DE REACT HOOK FORM
  const { register, handleSubmit } = useForm<SearchFormData>();

  if (!context) return null;
  const { products } = context;

  // 3. LÓGICA DE BÚSQUEDA INTELIGENTE HÍBRIDA (Por Nombre o ID exacto)
  const foundProduct = products.find(p => {
    const cleanSearch = searchTerm.trim();
    if (cleanSearch === "") return false;

    const matchesId = p.id === Number(cleanSearch);
    const matchesName = p.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesId || matchesName;
  });

  // 4. Función onSubmit requerida para la estructura de la librería
  const onSubmit = (data: SearchFormData) => {
    setSearchTerm(data.query);
  };

  return (
    <div className="home-container">
      
      <div className="top-section">
        {/* CAJA 1: BUSCADOR INTEGRADO CON FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="search-box">
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Search Product</h3>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text"
              className="search-input"
              placeholder="Type name or ID (e.g. iPhone or 5)..."
              style={{ flex: 1 }}
              // 5. CONECTA EL REGISTER Y LA CAPTURA EN TIEMPO REAL
              {...register("query")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Busca instantáneamente al escribir
            />
          </div>

          
        </form>

        {/* CAJA 2: PREVIEW */}
        <div className={`preview-box ${searchTerm && foundProduct ? 'active' : ''}`}>
          {searchTerm && foundProduct ? (
            <div className="product-preview">
              <img src={foundProduct.thumbnail} alt={foundProduct.title} className="preview-image" />
              <div className="preview-info">
                <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: 'bold', display: 'block' }}>
                  ID: #{foundProduct.id}
                </span>
                <h4 style={{ margin: 0 }}>{foundProduct.title}</h4>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>
                  Stock: <strong style={{ color: foundProduct.stock <= foundProduct.minLimit ? '#e74c3c' : '#2ecc71' }}>
                    {foundProduct.stock}
                  </strong>
                </p>
                <Link to={`/productdetail/${foundProduct.id}`} className="link-detail">
                  GO TO DETAIL →
                </Link>
              </div>
            </div>
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              {searchTerm && !foundProduct ? "No products match your search." : "Results will appear here..."}
            </p>
          )}
        </div>
      </div>

      {/* SECCIÓN INFERIOR: ESTADÍSTICAS */}
      <div className="stats-container">
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#2c3e50' }}>Inventory Overview</h3>
        
        <div className="stats-grid">
          <Link to="/inventory" className="stat-link">
            <div className="stat-box total-box">
              <span style={{ fontSize: '0.9rem' }}>Total Items</span>
              <p className="stat-number">{products.length}</p>
            </div>
          </Link>
          
          <Link to="/alerts" className="stat-link">
            <div className="stat-box low-stock-box">
              <span style={{ fontSize: '0.9rem' }}>Low Stock</span>
              <p className="stat-number">{products.filter(p => p.stock <= p.minLimit).length}</p>
            </div>
          </Link>

          <Link to="/alerts" className="stat-link">
            <div className="stat-box out-stock-box">
              <span style={{ fontSize: '0.9rem' }}>Out of Stock</span>
              <p className="stat-number">{products.filter(p => p.stock === 0).length}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
