import { fetchBase } from "@/client/fetch-base";

export const getAllProducts = async () =>
    fetchBase("/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const getProductById = async (id: Number) =>
    fetchBase(`/api/products/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

export const createProduct = async (product: any) =>
    fetchBase("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
