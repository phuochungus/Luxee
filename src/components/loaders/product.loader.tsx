import { getProductById } from "@/client";

export async function ProductLoader({ params }: any) {
    const id = params.id;
    console.log(id);
    if (id == "new")
        return {
            title: "",
            description: "",
            media: [],
            sku: "",
            barcode: "",
            cost: 0,
            unavailable: 0,
            commited: 0,
            available: 0,
            options: [],
            variants: [],
        };
    const res = await getProductById(params.id);
    console.log(res);
    switch (res.status) {
        case 200:
            return await res.json();

        default:
            throw {
                status: res.status,
                message: (await res.json()).error,
            };
    }
}
