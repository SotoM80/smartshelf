import { useParams } from "react-router-dom";
import { useContext } from "react"; 
import { InventoryContext } from "../context/InventoryContext"; // se Importa el cerebro
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import '../css/ProductDetail.css'

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();

    useDocumentTitle("Product Details");
    
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
        <div className="detail-container">
            {/* Enlace de retorno */}
            <Link to="/inventory" className="back-link">
                ← Back to Inventory
            </Link>

            {/* Tarjeta contenedora */}
            <div className="product-detail-card">
                <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="product-detail-image" 
                />
                
                <div className="product-detail-info">
                    <h1>{item.title}</h1>
                    
                    <p className="detail-price">${item.price}</p>
                    
                    <p className="detail-id">Ref ID: #{item.id}</p>

                   
                    <p 
                        className="detail-stock" 
                        style={{ color: item.stock <= item.minLimit ? '#e74c3c' : '#2ecc71' }}
                    >
                        <strong>Current Stock:</strong> {item.stock} units 
                        {item.stock <= item.minLimit && " (Low Stock)"}
                    </p>

                    <p className="detail-description">{item.description}</p>

                    
                    <button 
                        className="detail-sell-btn"
                        onClick={() => sellProduct(item.id)}
                        disabled={item.stock === 0}
                    >
                        {item.stock === 0 ? "Out of Stock" : "Sell One Unit (-1)"}
                    </button>
                </div>
            </div>
        </div>
    );
}