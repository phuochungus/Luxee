import React, { useEffect } from "react";
import {
    Inventory,
    MediaUpload,
    Pricing,
    TextEditor,
    VarianTable,
    VariationList,
} from "@/components";
import cartesian from "cartesian";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

export interface Product {
    title: string;
    description: string;
    media: File[];
    price: number;
    compareAt?: number;
    cost: number;
    sku?: string;
    barcode?: string;
    unavailable: number;
    commited: number;
    available: number;
    variations: Variation[];
    variants: Variant[];
}

export interface Variation {
    name: string;
    values: string[];
}

export interface Variant {
    sku?: string;
    barcode?: string;
    price: number;
    compareAt?: number;
    cost: number;
    unavailable: number;
    commited: number;
    available: number;
    media?: File[];
    selectedVariations: SelectedVariation[];
}

export interface SelectedVariation {
    name: string;
    value: string;
}

export interface VariationListContextProps {
    variationLists: Variation[];
    setVariationLists: (arr: Variation[]) => void;
}

export function Product() {
    const [product, setProduct] = React.useState<Product>({
        title: "",
        description: "",
        media: [],
        price: 0,
        cost: 0,
        variants: [],
        variations: [],
        unavailable: 0,
        available: 0,
        commited: 0,
    });

    useEffect(() => {
        if (product.variations.length == 0) {
            setProduct({ ...product, variants: [] });
            return;
        }

        const filterEmptyVariations = product.variations.filter(
            (array) => array.values.length > 0
        );
        const onlyValuesArray = filterEmptyVariations.map((array) => array.values);
        const cartesianProduct = cartesian(onlyValuesArray);
        const variants = cartesianProduct.map((array: string[]) => {
            const selectedVariations = array.map((value, index) => {
                return {
                    name: filterEmptyVariations[index].name,
                    value,
                };
            });
            return {
                selectedVariations,
                price: product.price,
                cost: product.cost,
                unavailable: product.unavailable,
                available: product.available,
                commited: product.commited,
            } as Variant;
        });

        setProduct({ ...product, variants: variants });
    }, [product.variations]);

    useEffect(() => {
        setProduct({
            ...product,
            variations: [
                {
                    name: "Color",
                    values: ["Red", "Blue", "Green"],
                },
                {
                    name: "Size",
                    values: ["S", "M", "L"],
                },
                {
                    name: "Material",
                    values: ["Cotton", "Polyester"],
                },
            ],
        });
    }, []);

    const [showGenerateText, setShowGenerateText] = React.useState(false);

    const handleAutoPressed = () => {
        setShowGenerateText((showGenerateText) => !showGenerateText);
    };

    return (
        <div className="container">
            <div className="mb-3">
                <h5>Title</h5>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Give your product a title.."
                />
            </div>
            <div className="mb-3">
                <h5>Description</h5>
                <TextEditor />
                <button className="rounded-circle border-0 d-flex justify-content-center align-items-center bg-transparent">
                    <AutoAwesomeOutlinedIcon fontSize="small" />
                </button>
            </div>
            <div className="mb-3">
                <h5>Media</h5>
                <MediaUpload product={product} setProduct={setProduct} />
            </div>
            {product.variations.length == 0 && (
                <>
                    <div className="mb-3">
                        <Pricing product={product} setProduct={setProduct} />
                    </div>
                    <div className="mb-3">
                        <Inventory product={product} setProduct={setProduct} />
                    </div>
                </>
            )}
            <div className="mb-3">
                <h5>Variations</h5>
                <VariationList
                    variations={product.variations}
                    setVariations={(variations: Variation[]) => {
                        setProduct({ ...product, variations: variations });
                    }}
                />
            </div>
            {product.variants.length != 0 && <VarianTable product={product} />}
        </div>
    );
}
