import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>(); // Atrapamos el ID de la URL
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        const getItem = async () => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setItem(data);
        };
        if (id) getItem();
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{item.title}</h1>
            <img src={item.thumbnail} alt={item.title} width="200" />
            <p>{item.description}</p>
        </div>
    );
}
