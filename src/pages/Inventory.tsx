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
        <ul style={{ 
            listStyle: 'none', 
            padding: 0,  
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: '10px', 
            justifyContent: 'center' 
        }}>
            {products.map(product => (
                <li key={product.id} className="product-card" style={{ width: '250px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        width="100%" 
                        style={{ borderRadius: '8px' }}
                    />
                    
                    <div>
                        {/* Link to detail page / Enlace al detalle */}
                        <Link to={`/productdetail/${product.id}`} style={{ textDecoration: 'none', color: '#ba1a3d' }}>
                            <h3 style={{ margin: 0 }}>{product.title}</h3>
                        </Link>
                        
                        <p style={{ fontWeight: 'bold', color: '#2ecc71' }}>${product.price}</p>
                        
                        {/* Display real-time stock / Muestra el stock en tiempo real */}
                        <p>Stock: <strong style={{ color: product.stock <= product.minLimit ?
                        '#e74c3c' : '#2ecc71' }}>{product.stock}</strong></p>

                        {/* 6. Sell button: decreases stock / Botón de vender: baja el stock */}
                        <button 
                            onClick={() => sellProduct(product.id)}
                            style={{ 
                                backgroundColor: '#ba1a3d', 
                                color: 'white', 
                                border: 'none', 
                                padding: '8px', 
                                cursor: 'pointer', 
                                borderRadius: '4px',
                                width: '100%',
                                marginTop: '10px'
                            }}
                        >
                            Sell (-1)
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
