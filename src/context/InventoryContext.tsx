// src/context/InventoryContext.tsx
import { type ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import { type Product, type InventoryContextType } from "../types";

// 1. Create the context / Crea el contexto
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// 2. The Provider component / El componente proveedor
export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]); // Global products list / Lista global de productos
  const [loading, setLoading] = useState(true);            // Loading state / Estado de carga
  const [error, setError] = useState<string | null>(null); // Error state / Estado de error

  // 3. EFFECT: Load Data from LocalStorage or API / Trae los datos de LocalStorage o API
  useEffect(() => {
    const initInventory = async () => {
      try {
        // Check if there is data saved in the browser / Revisa si hay datos guardados en el navegador
        const savedData = localStorage.getItem("smart_stock_data");

        if (savedData) {
          // If data exists, use it / Si los datos existen, úsalos
          setProducts(JSON.parse(savedData));
          setLoading(false);
        } else {
          // If not, fetch from API / Si no, tráelos de la API
          const res = await fetch("https://dummyjson.com/products?limit=100");
          const data = await res.json();

          // Add 'minLimit' to each product / Agrega el límite mínimo a cada producto
          const productsWithLimit = data.products.map((p: Product) => ({
            ...p,
            minLimit: 5 
          }));

          setProducts(productsWithLimit);
          
          // Save for the first time / Guarda por primera vez
          localStorage.setItem("smart_stock_data", JSON.stringify(productsWithLimit));
        }
      } catch (err) {
        console.error("Init error:", err);
        setError("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };

    initInventory();
  }, []); // Se ejecuta una vez al montar

  // 4. EFFECT: Auto-save on changes / Auto-guardado al detectar cambios
  // Runs every time the 'products' state updates / Se ejecuta cada vez que el stock cambia
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("smart_stock_data", JSON.stringify(products));
    }
  }, [products]);

  // 5. Function to sell / Función para vender
  const sellProduct = (id: number) => {
    setProducts(prev => prev.map(p => 
      // Decrease stock if ID matches / Baja el stock si el ID coincide
      p.id === id && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p
    ));
  };

  // 6. Function to restock / Función para reponer
  const restockProduct = (id: number) => {
    setProducts(prev => prev.map(p => 
      // Increase stock by 20 / Sube el stock en 20
      p.id === id ? { ...p, stock: p.stock + 20 } : p
    ));
  };

  // 7. Retorna el proveedor con los valores
  return (
    <InventoryContext.Provider value={{ products, loading, error, sellProduct, restockProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext };
