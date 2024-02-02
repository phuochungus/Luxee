import { fetchBase } from "@/client";
import { Media } from "@/components";

export const createSignature = async () => {
    return fetchBase("/api/media/signature", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const updateMedia = async (productId: Number, media: Media[]) => {
    return fetchBase(`/api/products/${productId}/media`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(media),
    });
};
