export interface Product {
    id:number;
    title:string;
    description:string;
    price: number;
    stock: number;
    thumbnail:string;
    minLimit:number;
}


export interface InventoryContextType {
    products:Product[];
    loading:boolean;
    error: string | null;
    sellProduct: (id: number) => void;
    restockProduct: (id: number) => void;
    
}