import { useContext } from "react";
// Importando el  context de inventorycontext
import { InventoryContext } from "../context/InventoryContext"; 
import { Link } from "react-router-dom";



export default function Alerts() {
    const context = useContext(InventoryContext);

    if (!context) return <p>Context Error</p>;

    const { products, restockProduct } = context;

    
    // FILTRO: Solo productos con stock menor o igual al límite
    const lowStockProducts = products.filter(p => p.stock <= p.minLimit);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Low Stock Alerts</h1>
            
            {/* 2. Empty State: If there are no alerts / Si no hay alertas */}
            {lowStockProducts.length === 0 ? (
                <p style={{ color: '#2ecc71', fontWeight: 'bold' }}>
                     All products are well stocked!
                </p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {lowStockProducts.map(product => (
                        <li key={product.id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            backgroundColor: '#fff5f5', // Light red / Rojo claro
                            border: '1px solid #feb2b2',
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '8px'
                        }}>
                            <div>
                                <h3 style={{ margin: 0, color: '#c53030' }}>{product.title}</h3>
                                 <p style={{ margin: '5px 0', fontWeight: 'bold', color: product.stock === 0 ? '#e53e3e' : '#dd6b20' }}>
                                    {product.stock === 0 ? 'OUT OF STOCK' : `LOW STOCK: ${product.stock} units`}
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* Link al detalle usando el ID dinámico */}
                                <Link to={`/productdetail/${product.id}`}>
                                    <button style={{ 
                                        padding: '8px 15px', 
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        border: '1px solid #cbd5e0',
                                        backgroundColor: 'white'
                                    }}>
                                        View
                                    </button>
                                </Link>

                                {/* 5. CAMBIO AQUÍ: ACCIÓN DE REPONER (Restock Action) */}
                                <button 
                                    onClick={() => restockProduct(product.id)}
                                    style={{ 
                                        backgroundColor: '#38a169', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '8px 20px', 
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Restock (+20)
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}