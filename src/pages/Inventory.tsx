import { useContext } from "react";

// 1.  Importa del inventorycontext.tsx
import { InventoryContext } from "../context/InventoryContext"; 
import { Link } from "react-router-dom";

export default function Inventory() {
    // 2.  Usa el hook 
    const context = useContext(InventoryContext);

    // 3.  Validación de seguridad
    if (!context) return <p>Error: Context not found</p>;

    // 4. Extract data and functions / Extrae los datos y funciones
    const { products, loading, error, sellProduct } = context;

    // 5.Estados de carga y error
    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p style={{color:'red'}}>Error: {error}</p>;

    return (
        <div className="inventory-container">
                  <ul className="inventory-grid">

            {products.map(product => (
                <li key={product.id} className="product-card" >
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                       
                    />
                    
                    <div>
                        {/* Link to detail page / Enlace al detalle */}
                        <Link to={`/productdetail/${product.id}`} className="product-title-link">
                            <h3 style={{ margin: 0 }}>{product.title}</h3>
                        </Link>
                        
                        <p className="product-price">${product.price}</p>
                        <p className="product-description">{product.description}</p>
                        
                        {/* Display real-time stock / Muestra el stock en tiempo real */}
                        <p className="stock-tag">Stock: <strong style={{ color: product.stock <= product.minLimit ?
                        '#e74c3c' : '#2ecc71' }}>{product.stock}</strong></p>

                        {/* 6. Sell button: decreases stock / Botón de vender: baja el stock */}
                        <button className="sell-button"
                            onClick={() => sellProduct(product.id)}
                           
                        >
                            Sell (-1)
                        </button>
                    </div>
                </li>
            ))}
     </ul>
        </div>
    );
}
