import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Link } from "react-router-dom";


export default function Home() {
  const context = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState("");

  if (!context) return null;
  const { products } = context;

  const foundProduct = products.find(p => 
    searchTerm !== "" && p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      
      <div className="top-section">
        {/* CAJA 1: BUSCADOR */}
        <div className="search-box">
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Search Product</h3>
          <input 
            type="text"
            className="search-input"
            placeholder="Type name (e.g. iPhone)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CAJA 2: PREVIEW (Uso de clase dinámica) */}
        <div className={`preview-box ${searchTerm && foundProduct ? 'active' : ''}`}>
          {searchTerm && foundProduct ? (
            <div className="product-preview">
              <img src={foundProduct.thumbnail} alt={foundProduct.title} className="preview-image" />
              <div className="preview-info">
                <h4 style={{ margin: 0 }}>{foundProduct.title}</h4>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>
                  Stock: <strong style={{ color: foundProduct.stock <= 5 ? '#e74c3c' : '#2ecc71' }}>
                    {foundProduct.stock}
                  </strong>
                </p>
                <Link to={`/productdetail/${foundProduct.id}`} className="link-detail">
                  GO TO DETAIL →
                </Link>
              </div>
            </div>
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Results will appear here...</p>
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
