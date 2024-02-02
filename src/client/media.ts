import { fetchBase } from "@/client";
import { Media } from "@/components";

export const updateMedia = async (id: Number, media: Media[]) => {
    return fetchBase(`/api/products/${id}/media`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(media),
    });
};
