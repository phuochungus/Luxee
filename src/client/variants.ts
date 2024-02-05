import { fetchBase } from "@/client";
import { Variant } from "@/components";

export const createVariants = async (productId: Number, variants: Variant[]) =>
    fetchBase(`/api/products/${productId}/variants`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(variants),
    });
