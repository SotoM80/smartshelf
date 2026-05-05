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

  // 3. Fetch data from the API / Trae los datos de la API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // Add 'minLimit' to each product / Agrega el límite mínimo a cada producto
        const productsWithLimit = data.products.map((p: Product) => ({
          ...p,
          minLimit: 5 // Trigger alert if stock is below this / Alerta si el stock baja de aquí
        }));

        setProducts(productsWithLimit); // Save in state / Guarda en el estado
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data"); // Handle error / Maneja el error
      } finally {
        setLoading(false);              // Stop loading / Detiene la carga
      }
    };

    fetchInventory();
  }, []); // Se ejecuta una vez al montar

  // 4.  Función para vender
  const sellProduct = (id: number) => {
    setProducts(prev => prev.map(p => 
      // Decrease stock if ID matches / Baja el stock si el ID coincide
      p.id === id && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p
    ));
  };

  // 5. Function to restock / Función para reponer(no listo aun)
  const restockProduct = (id: number) => {
    setProducts(prev => prev.map(p => 
      //avisa Sube el stock en 20
      p.id === id ? { ...p, stock: p.stock + 20 } : p
    ));
  };

  // 6. Retorna el proveedor con los valores
  return (
    <InventoryContext.Provider value={{ products, loading, error, sellProduct, restockProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext };