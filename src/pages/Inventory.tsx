import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



// SECCIÓN 1: Definición de Interfaces (Contratos de datos)
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    stock: number;
}

export default function Inventory() {
    // SECCIÓN 2: Estados (Hooks de React)
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // SECCIÓN 3: Efectos (Disparadores de carga)
    useEffect(() => {
        fetchData();
    }, []);

    // SECCIÓN 4: Lógica de Negocio y Funciones de API
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://dummyjson.com/products?limit=70');
            const data = await res.json();
            
            console.log("Datos recibidos:", data);
            setProducts(data.products);
        } catch (error) {
            console.error("Error cargando datos", error);
        } finally {
            setLoading(false);
        }
    };

    // SECCIÓN 5: Renderizado Condicional (Estados de carga/error)
    if (loading) return <p>Cargando inventario...</p>;

    // SECCIÓN 6: Interfaz de Usuario (Vista final)
    return (
        <ul style={{ listStyle: 'none', padding: 0,  display: 'flex',flexDirection:'row',flexWrap:'wrap', gap:'10px', justifyContent:'center' }}>
            {products.map(product => (
                <li key={product.id} className="tarjeta-producto">
                <img src={product.thumbnail} alt={product.title} width="90%" 
                style={{ borderRadius: '8px', marginLeft:'20px' }}/>
                    
                    <div>
                        <Link to={`/productdetail/${product.id}`} style={{ textDecoration: 'none', color: '#ba1a3d' }}><h3 style={{ margin: 0 }}>{product.title}</h3></Link>
                        <p style={{ fontWeight: 'bold', color: '#2ecc71' }}>${product.price}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{product.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

// interface Product {
//     id: number;
//     title: string;
//     price: number;
//     description:string;
//     thumbnail: string;
//     imges:string;
// }

// export default function Inventory() {
//     // SECCIÓN 2: Definición de estados
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     // SECCIÓN 3: El "disparador" (Faltaba en tu código)
//     useEffect(() => {
//         fetchData();
//     }, []);

//     // SECCIÓN 4: La lógica
//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch('https://dummyjson.com/products');
           
//             const data = await res.json();
//               console.log("1. Datos recibidos de la API:", data);
//             setProducts(data.products);
           
//         } catch (error) {
//             console.error("Error cargando datos", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <p>Cargando...</p>;

//     return (
//         <ul>
//             {products.map(product => (
//                <li key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
//                         <img src={product.thumbnail} alt={product.title} width="200" />
                        
//                         <span>{product.title} - ${product.price}{product.description}</span>
//                     </li>
//             ))}
//         </ul>
//     );
// }