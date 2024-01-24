import { Box } from "@mui/material";
import React, { useEffect } from "react";
import {
    SideBar,
    Inventory,
    MediaUploadInput,
    Pricing,
    TextEditor,
    VariantTable,
    VariationList,
} from "@/components";
import cartesian from "cartesian";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

export interface Product {
    title: string;
    description: string;
    media: File[];
    price: string;
    compareAt?: string;
    cost: string;
    sku?: string;
    barcode?: string;
    unavailable: string;
    commited: string;
    available: string;
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
    price: string;
    cost: string;
    unavailable: string;
    commited: string;
    available: string;
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
        price: "0",
        cost: "0",
        variants: [],
        variations: [],
        unavailable: "0",
        available: "0",
        commited: "0",
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
            };
        });

        setProduct({ ...product, variants: variants });
    }, [product.variations]);

    // useEffect(() => {
    //     setProduct({
    //         ...product,
    //         variations: [
    //             {
    //                 name: "Color",
    //                 values: ["Red", "Blue", "Green"],
    //             },
    //             {
    //                 name: "Size",
    //                 values: ["S", "M", "L"],
    //             },
    //             {
    //                 name: "Material",
    //                 values: ["Cotton", "Polyester"],
    //             },
    //         ],
    //     });
    // }, []);

    const [showGenerateText, setShowGenerateText] = React.useState(false);

    const handleAutoPressed = () => {
        setShowGenerateText((showGenerateText) => !showGenerateText);
    };

    return (
        <>
            <div className="container">
                <div className="mb-3">
                    <h5>Title</h5>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <div className="d-flex flex-row align-items-end justify-content-between">
                        <h5>Description</h5>
                        <button>
                            <AutoAwesomeOutlinedIcon />
                        </button>
                    </div>
                    <TextEditor />
                </div>

                <div className="mb-3">
                    <h5>Media</h5>
                    <MediaUploadInput product={product} setProduct={setProduct} />
                </div>
                {product.variations.length == 0 && (
                    <div className="mb-3">
                        <Pricing product={product} setProduct={setProduct} />
                        <Inventory product={product} setProduct={setProduct} />
                    </div>
                )}

                <h5>Variations</h5>
                <div>
                    <VariationList product={product} setProduct={setProduct} />
                </div>
                {product.variants && <VariantTable product={product} />}
            </div>
        </>
    );
}
