import { useContext, useState } from "react";
import ErrorMessage from "../components/ErrorMessage.tsx";

// 1.  Importa del inventorycontext.tsx
import { InventoryContext } from "../context/InventoryContext"; 
import { Link } from "react-router-dom";
import "../css/Inventory.css";
import { useDocumentTitle } from "../hooks/useDocumentTitle.ts";

export default function Inventory() {
    const context = useContext(InventoryContext);

    useDocumentTitle("Inventory");
    // 2. Estado para el texto del buscador y categoria
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    if (!context) return <p>Error: Context not found</p>;

    const { products, loading, error, sellProduct } = context;

    //3 lista sin nombres, usando set
    const categories = Array.from(new Set (products.map(p => p.category)))

    // 4. FILTRO DINÁMICO: Filtra la lista original basándose en el nombre
    const filteredProducts = products.filter(product => {

        //limpia el texto (saca espacios molestos)
        const cleanSearch = searchTerm.trim();
        
        //revisar si coincide el id 
        const matchesId = cleanSearch !=="" && product.id === Number (cleanSearch);
        const matchesName = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        
       
       
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        if (matchesId) return true;
        return matchesCategory && matchesName;

    });

   if (loading) {
    return (
        <div className="loading-box">
            <div className="spinner"></div>
            <p style={{ color: '#666', fontWeight: 'bold' }}>Fetching smart stock data...</p>
        </div>
    );
}
    if (error) {
    return (
        <ErrorMessage 
            message={error} 
            onRetry={() => window.location.reload()} // Recarga la página para reintentar el fetch
        />
    );
}

    return (
        <div className="inventory-container">
            <h1 style={{ marginBottom: '20px' }}>Product Inventory</h1>

            {/* 4. BARRA DE BÚSQUEDA y FILTROS COMBINADOS*/}
            <div className="search-bar-container">
                <input 
                    type="text" 
                    placeholder="Search by product name or Id" 
                    className="inventory-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                   {/* Selector Dropdown de Categorías */}
                <select 
                    className="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
                <p className="results-count">
                    Showing {filteredProducts.length} products
                </p>
            </div>
            
            <ul className="inventory-grid">
                {/* 5. IMPORTANTE: Uso de filteredProducts en lugar de products */}
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-card">
                        {/* ... (todo lo demás se queda igual dentro del map) ... */}
                        <img src={product.thumbnail} alt={product.title} className="product-image" />
                        <Link to={`/productdetail/${product.id}`} className="product-title-link">
                            <h3 style={{ margin: 0 }}>{product.title}</h3>
                        </Link>
                        
                        <p className="product-price">${product.price}</p>
                        <p style={{ fontSize:'1rem',color: '#2ecc71', fontWeight: 'bold'}}>Id:{product.id}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="stock-tag">
                            Stock: <strong style={{ color: product.stock <= product.minLimit ? '#e74c3c' : '#2c3e50' }}>
                                {product.stock} units
                            </strong>
                        </p>
                        <button 
                            className="sell-button"
                            onClick={() => sellProduct(product.id)}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? "Out of Stock" : "Sell Unit (-1)"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}