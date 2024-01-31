import fetch from "unfetch";

export interface Product {
    id: Number;
    isDraft: Boolean;
    media: any[];
    options: any[];
    title: String;
    description?: String;
    barcode?: String;
    sku?: String;
    price: Number;
    compareAtPrice?: Number;
    cost?: Number;
    unavailable?: Number;
    available?: Number;
    committed?: Number;
}

export const getAllProducts = async () => fetch("/api/products", { method: "GET" });

export const getProductById = async (id: Number) =>
    fetch(`/api/products/${id}`, { method: "GET" });

export const createProduct = async (product: any) =>
    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
