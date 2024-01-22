import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useEffect } from "react";
import {
    ClippedDrawer,
    InventoryCard,
    PricingCard,
    TextEditor,
    VariantTable,
    VariationList,
} from "@/components";

interface Product {
    title: string;
    description: string;
    media?: FileList;
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
    media?: FileList;
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

export function AddProduct() {
    const [product, setProduct] = React.useState<Product>({
        title: "",
        description: "",
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
        const combinations = getAllCombinations(product.variations);
        const variants = combinations.map((combination) => {
            const selectedVariations = combination.map((value, index) => {
                return {
                    name: product.variations[index].name,
                    value: value,
                };
            });
            return {
                sku: product.sku,
                barcode: product.barcode,
                price: product.price,
                cost: product.cost,
                unavailable: product.unavailable,
                commited: product.commited,
                available: product.available,
                media: product.media,
                selectedVariations: selectedVariations,
            };
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

    const getAllCombinations = (variants: Variation[]): string[][] => {
        if (variants.length == 1) return variants[0].values.map((value) => [value]);
        const cartesian = (...a: any) => {
            return a.reduce((a: any, b: any) =>
                a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
            );
        };

        const variantValues = variants.map((variant) => variant.values);
        const variantCombinations = cartesian(...variantValues);
        return variantCombinations;
    };

    return (
        <ClippedDrawer>
            <Container sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
                <Typography>Title</Typography>
                <TextField
                    sx={{ mt: 0.5 }}
                    size="small"
                    value={product.title}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            title: e.target.value,
                        })
                    }
                />

                <Box sx={{ mt: 2, width: "100%" }}>
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"flex-end"}
                        justifyContent={"space-between"}
                    >
                        <Typography>Description</Typography>
                        <IconButton onClick={handleAutoPressed} size="small">
                            <AutoAwesomeOutlinedIcon fontSize="small" />:
                        </IconButton>
                    </Box>
                    <TextEditor />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography>Media</Typography>
                    <Box sx={{ mt: 0.5 }}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload media
                            <input
                                type="file"
                                accept="video/*,image/*"
                                multiple
                                hidden
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        ...(e.target.files
                                            ? { media: e.target.files }
                                            : null),
                                    })
                                }
                            />
                        </Button>
                    </Box>
                </Box>
                {product.variations.length == 0 && (
                    <Box sx={{ my: 2 }}>
                        <PricingCard product={product} setProduct={setProduct} />
                        <InventoryCard product={product} setProduct={setProduct} />
                    </Box>
                )}

                <Box sx={{ my: 2 }}>
                    <Typography>Variations</Typography>
                    <Box sx={{ mb: 1 }}>
                        <VariationList product={product} setProduct={setProduct} />
                    </Box>
                    {product.variants && <VariantTable product={product} />}
                </Box>
            </Container>
        </ClippedDrawer>
    );
}
