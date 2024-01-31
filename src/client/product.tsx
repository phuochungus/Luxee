import fetch from "unfetch";

type Unfetch = (
    url: string,
    options?: {
        method?: string;
        headers?: Record<string, string>;
        credentials?: "include" | "omit";
        body?: Parameters<XMLHttpRequest["send"]>[0];
    }
) => Promise<UnfetchResponse>;

type UnfetchResponse = {
    ok: boolean;
    statusText: string;
    status: number;
    url: string;
    text: () => Promise<string>;
    json: () => Promise<any>;
    blob: () => Promise<Blob>;
    clone: () => UnfetchResponse;
    headers: {
        keys: () => string[];
        entries: () => Array<[string, string]>;
        get: (key: string) => string | undefined;
        has: (key: string) => boolean;
    };
};

const fetchBase: Unfetch = (
    url: string,
    options?: {
        method?: string;
        headers?: Record<string, string>;
        credentials?: "include" | "omit";
        body?: Parameters<XMLHttpRequest["send"]>[0];
    }
) => fetch(`${import.meta.env.VITE_BACKEND_BASE_UR}${url}`, options);

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
