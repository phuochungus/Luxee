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
import MiniDrawer from "../components/drawer";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { IVariantOption, VariantOption } from "../components/variant-option";

interface Product {
    title: string;
    description: string;
    media: string[] | FileList | null;
    price: string;
    compareAt?: string;
    cost: string;
    sku?: string;
    barcode?: string;
    unavailable: number;
    commited: number;
    available: number;
    variantOptions: IVariantOption[];
}

export function AddProduct() {
    const [createProductDto, setCreateProductDto] = React.useState<Product>({
        title: "",
        description: "",
        media: [],
        price: "0",
        cost: "0",
        unavailable: 0,
        variantOptions: [
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
        available: 0,
        commited: 0,
    });
    const [showGenerateText, setShowGenerateText] = React.useState(false);

    const handleAutoPressed = () => {
        setShowGenerateText((showGenerateText) => !showGenerateText);
    };

    const getAllCombinations = (variants: IVariantOption[]): string[][] => {
        const cartesian = (...a: any) =>
            a.reduce((a: any, b: any) =>
                a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
            );
        const variantValues = variants.map((variant) => variant.values);
        const variantCombinations = cartesian(...variantValues);
        return variantCombinations;
    };

    return (
        <MiniDrawer>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>Title</Typography>
                <TextField
                    sx={{ my: 1 }}
                    size="small"
                    value={createProductDto.title}
                    onChange={(e) =>
                        setCreateProductDto({
                            ...createProductDto,
                            title: e.target.value,
                        })
                    }
                />
                <Typography>Description</Typography>
                <TextField
                    sx={{ mt: 1 }}
                    multiline
                    size="small"
                    minRows={3}
                    value={createProductDto.description}
                    onChange={(e) =>
                        setCreateProductDto({
                            ...createProductDto,
                            description: e.target.value,
                        })
                    }
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <IconButton onClick={handleAutoPressed}>
                        <AutoAwesomeOutlinedIcon />:
                    </IconButton>
                </Box>
                <Typography>Media</Typography>
                <Box>
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
                                setCreateProductDto({
                                    ...createProductDto,
                                    media: e.target.files,
                                })
                            }
                        />
                    </Button>
                </Box>
                <Typography>Pricing</Typography>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={3} width={"auto"}>
                            <TextField
                                label="Price"
                                size="small"
                                required
                                value={createProductDto.price}
                                onChange={(e) =>
                                    setCreateProductDto({
                                        ...createProductDto,
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
                                value={createProductDto.compareAt}
                                onChange={(e) =>
                                    setCreateProductDto({
                                        ...createProductDto,
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
                                value={createProductDto.cost}
                                onChange={(e) =>
                                    setCreateProductDto({
                                        ...createProductDto,
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
                                    parseFloat(createProductDto.price) -
                                    parseFloat(createProductDto.cost)
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
                                        (parseFloat(createProductDto.price) -
                                            parseFloat(createProductDto.cost)) /
                                            parseFloat(createProductDto.price)
                                    )
                                        ? "--"
                                        : `${(
                                              ((parseFloat(createProductDto.price) -
                                                  parseFloat(createProductDto.cost)) /
                                                  parseFloat(createProductDto.price)) *
                                              100
                                          ).toFixed(2)}%`
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Typography>Inventory</Typography>
                <Box>
                    <Grid container spacing={2} columnSpacing={1}>
                        <Grid item xs={3}>
                            <TextField
                                label="SKU"
                                size="small"
                                value={createProductDto.sku}
                                onChange={(e) =>
                                    setCreateProductDto({
                                        ...createProductDto,
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
                                defaultValue={0}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Commited" size="small" defaultValue={0} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Available" size="small" defaultValue={0} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="On-hand"
                                size="small"
                                defaultValue={"0"}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Typography>Variants</Typography>
                <List>
                    {createProductDto.variantOptions.map((variant, index) => {
                        return (
                            <div key={index}>
                                <Divider />
                                <ListItem>
                                    <Box sx={{ width: "100%" }}>
                                        <VariantOption
                                            name={variant.name}
                                            values={variant.values}
                                        />
                                    </Box>
                                </ListItem>
                            </div>
                        );
                    })}
                </List>
                <Box>
                    <Table>
                        <TableHead>
                            <TableCell width={2}>
                                <Box display={"flex"} flexDirection={"row"}>
                                    No.
                                    <TableSortLabel />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display={"flex"} flexDirection={"row"}>
                                    Variant (
                                    {createProductDto.variantOptions
                                        .map((a) => a.name)
                                        .join("-")}
                                    )
                                    <TableSortLabel />
                                </Box>
                            </TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {getAllCombinations(createProductDto.variantOptions).map(
                                (combination, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{combination.join("-")}</TableCell>
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
                                )
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </MiniDrawer>
    );
}
