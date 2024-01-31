import fetch from "unfetch";

const getAllProducts = async () => {
    const res = await fetch("/api/products", { method: "GET" });
    return await res.json();
};

const getProductById = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: "GET" });
    return await res.json();
};

const createProduct = async (product: any) => {
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    return await res.json();
};
