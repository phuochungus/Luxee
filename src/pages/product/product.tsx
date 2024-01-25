import React, { useEffect } from "react";
import {
    Inventory,
    MediaUpload,
    Pricing,
    Description,
    VarianTable,
    VariationList,
    Collapse,
} from "@/components";
import cartesian from "cartesian";

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
                <Description />
                <div className="mt-2">
                    <Collapse
                        trigger={
                            <button
                                className=" btn btn-outline-info btn-sm"
                                type="button"
                            >
                                <div className="d-flex align-items-center flex-wrap">
                                    Try generate with AI (beta)
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="purple"
                                        className="bi bi-stars"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                                    </svg>
                                </div>
                            </button>
                        }
                    >
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea"
                            ></textarea>
                            <label>Comments</label>
                        </div>
                    </Collapse>
                </div>
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
