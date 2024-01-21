import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { MiniDrawer, VariationRow } from "@/components";

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

interface Variant {
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
        console.log(product.variants);
    }, [product.variants]);

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
        <MiniDrawer>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
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
                    <TextField
                        sx={{ mt: 0.5, width: "100%" }}
                        multiline
                        size="small"
                        minRows={3}
                        value={product.description}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                    />
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
                <Box sx={{ my: 2 }}>
                    {product.variations.length == 0 && (
                        <>
                            <Typography>Pricing</Typography>
                            <Box sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3} width={"auto"}>
                                        <TextField
                                            label="Price"
                                            size="small"
                                            required
                                            value={product.price}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    price: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3} width={"auto"}>
                                        <TextField
                                            label="Compare-at"
                                            size="small"
                                            defaultValue={"--"}
                                            value={product.compareAt}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    compareAt: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4} width={"auto"} />
                                    <Grid item xs={3} width={"auto"}>
                                        <TextField
                                            label="Cost"
                                            size="small"
                                            value={product.cost}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    cost: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3} width={"auto"}>
                                        <TextField
                                            label="Profit"
                                            size="small"
                                            InputProps={{ readOnly: true }}
                                            disabled
                                            value={
                                                parseFloat(product.price.toString()) -
                                                parseFloat(product.cost.toString())
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3} width={"auto"}>
                                        <TextField
                                            label="Margin"
                                            size="small"
                                            InputProps={{ readOnly: true }}
                                            disabled
                                            value={
                                                isNaN(
                                                    (parseFloat(
                                                        product.price.toString()
                                                    ) -
                                                        parseFloat(
                                                            product.cost.toString()
                                                        )) /
                                                        parseFloat(
                                                            product.price.toString()
                                                        )
                                                )
                                                    ? "--"
                                                    : `${(
                                                          ((parseFloat(
                                                              product.price.toString()
                                                          ) -
                                                              parseFloat(
                                                                  product.cost.toString()
                                                              )) /
                                                              parseFloat(
                                                                  product.price.toString()
                                                              )) *
                                                          100
                                                      ).toFixed(2)}%`
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Typography sx={{ mt: 2, mb: 1 }}>Inventory</Typography>
                            <Box>
                                <Grid container spacing={2} columnSpacing={1}>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="SKU"
                                            size="small"
                                            value={product.sku}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    sku: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField label="Barcode" size="small" />
                                    </Grid>
                                    <Grid item xs={6} />
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Unavailable"
                                            size="small"
                                            value={product.unavailable}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    unavailable: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Commited"
                                            size="small"
                                            value={product.commited}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    commited: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Available"
                                            size="small"
                                            value={product.available}
                                            onChange={(e) =>
                                                setProduct({
                                                    ...product,
                                                    available: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="On-hand"
                                            size="small"
                                            InputProps={{ readOnly: true }}
                                            disabled
                                            value={
                                                +product.available +
                                                +product.unavailable +
                                                +product.commited
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )}
                </Box>

                <Typography>Variants</Typography>
                <List component={Box} disablePadding>
                    {product.variations.map((variation, index) => {
                        return (
                            <div key={variation.name}>
                                <Divider />
                                <ListItem>
                                    <Box sx={{ width: "100%" }}>
                                        <VariationRow
                                            variation={variation}
                                            openEditor={
                                                variation.name == "" &&
                                                variation.values.length == 0
                                            }
                                            setVariation={(name, values) => {
                                                setProduct({
                                                    ...product,
                                                    variations: product.variations.map(
                                                        (e, i) => {
                                                            if (i == index) {
                                                                return {
                                                                    name: name,
                                                                    values: values,
                                                                };
                                                            } else {
                                                                return e;
                                                            }
                                                        }
                                                    ),
                                                });
                                            }}
                                            deleteVariation={() => {
                                                setProduct({
                                                    ...product,
                                                    variations: product.variations.filter(
                                                        (_, i) => i != index
                                                    ),
                                                });
                                            }}
                                        />
                                    </Box>
                                </ListItem>
                            </div>
                        );
                    })}
                    <Divider />
                    <ListItem>
                        <Typography
                            sx={{
                                color: "blue",
                                cursor: "pointer",
                                ":hover": {
                                    textDecoration: "underline",
                                },
                            }}
                            onClick={() => {
                                setProduct({
                                    ...product,
                                    variations: [
                                        ...product.variations,
                                        { name: "", values: [] },
                                    ],
                                });
                            }}
                        >
                            + Add more...
                        </Typography>
                    </ListItem>
                </List>
                {product.variants && (
                    <>
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={2}>
                                            <Box display={"flex"} flexDirection={"row"}>
                                                No.
                                                <TableSortLabel />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display={"flex"} flexDirection={"row"}>
                                                Variant (
                                                {product.variations
                                                    .map((a) => a.name)
                                                    .join("-")}
                                                )
                                                <TableSortLabel />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.variants.map((variant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {variant.selectedVariations
                                                    .map((e) => e.value)
                                                    .join(" / ")}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box>
                                                    <IconButton>
                                                        <VisibilityOffIcon />
                                                    </IconButton>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </>
                )}
            </Container>
        </MiniDrawer>
    );
}
