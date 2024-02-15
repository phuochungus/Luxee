import { getProductById } from "@/client";

export async function ProductLoader({ params }: any) {
    const id = params.id;
    if (id == "new")
        return {
            title: "",
            description: "",
            media: [],
            sku: "",
            barcode: "",
            cost: 0,
            unavailable: 0,
            committed: 0,
            available: 0,
            options: [],
            variants: [],
        };
    const res = await getProductById(params.id);
    switch (res.status) {
        case 200:
            return await res.json();

        default:
            throw {
                status: res.status,
                message: await res.text(),
            };
    }
}
