import { useParams } from "react-router-dom";
import { useContext } from "react"; // 1. Cambiando useState/useEffect por useContext
import { InventoryContext } from "../context/InventoryContext"; // Importamos el cerebro
import { Link } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    
    // 2. se consumen los datos globales (ya no de necesita fetch local)
    const context = useContext(InventoryContext);
    
    // Seguridad por si el contexto falla
    if (!context) return <p>Context Error</p>;

    const { products, sellProduct } = context;

    // 3. buscando el producto en la lista global usando el ID de la URL
    const item = products.find((p) => p.id === Number(id));

    // 4. Si el producto aún no carga o no existe
    if (!item) return <p>Loading product details...</p>;

    return (
        <div style={{ padding: '20px', textAlign: 'left' }}>
            <Link to="/inventory" style={{ textDecoration: 'none', color: '#ba1a3d' }}>
                ← Back to Inventory
            </Link>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <img src={item.thumbnail} alt={item.title} width="300" style={{ borderRadius: '10px' }} />
                
                <div>
                    <h1>{item.title}</h1>
                    <p style={{ fontSize: '1.5rem', color: '#2ecc71', fontWeight: 'bold' }}>
                        ${item.price}
                    </p>

                    {/* 5. SE LE  AGREGA A STOCK  COLOR DINÁMICO PARA DIFERENCIAR */}
                    <p style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        // Si el stock es <= 5 (minLimit), se pone rojo, si no, verde
                        color: item.stock <= item.minLimit ? '#e74c3c' : '#2ecc71' 
                    }}>
                        Current Stock: {item.stock} {item.stock <= item.minLimit && "⚠️ (Low Stock)"}
                    </p>

                    <p>{item.description}</p>

                    {/* 6. BOTÓN DE VENTA  */}
                    <button 
                        onClick={() => sellProduct(item.id)}
                        style={{
                            backgroundColor: '#ba1a3d',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Sell One Unit (-1)
                    </button>
                </div>
            </div>
        </div>
    );
}