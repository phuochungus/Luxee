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
    styled,
} from "@mui/material";
import MiniDrawer from "../components/drawer";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { IVariant, Variants } from "../components/variant";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

interface ICreateProduct {
    title: string;
    description: string;
    media: string[];
    price: number;
    compareAt: number;
    cost?: number;
    variants: IVariant[];
}

export function AddProduct() {
    const [showGenerateText, setShowGenerateText] = React.useState(false);

    const handleAutoPressed = () => {
        setShowGenerateText((showGenerateText) => !showGenerateText);
    };

    const variants: IVariant[] = [
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
    ];

    const getAllCombinations = (variants: IVariant[]): string[][] => {
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
                <TextField sx={{ my: 1 }} size="small" />
                <Typography>Description</Typography>
                <TextField sx={{ mt: 1 }} multiline size="small" minRows={3} />
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
                <Typography>Media*</Typography>
                <Box>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload media
                        <VisuallyHiddenInput
                            type="file"
                            accept="video/*,image/*"
                            multiple
                        />
                    </Button>
                </Box>
                <Typography>Pricing</Typography>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={3} width={"auto"}>
                            <TextField label="Price" size="small" required />
                        </Grid>
                        <Grid item xs={3} width={"auto"}>
                            <TextField label="Compare-at" size="small" />
                        </Grid>
                        <Grid item xs={4} width={"auto"} />
                        <Grid item xs={3} width={"auto"}>
                            <TextField label="Cost" size="small" />
                        </Grid>
                        <Grid item xs={3} width={"auto"}>
                            <TextField
                                label="Profit"
                                size="small"
                                defaultValue={"--"}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={3} width={"auto"}>
                            <TextField
                                label="Margin"
                                size="small"
                                InputProps={{ readOnly: true }}
                                defaultValue={"--"}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Typography>Inventory</Typography>
                <Box>
                    <Grid container spacing={2} columnSpacing={1}>
                        <Grid item xs={3}>
                            <TextField label="SKU" size="small" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Barcode" size="small" />
                        </Grid>
                        <Grid item xs={6} />
                        <Grid item xs={3}>
                            <TextField label="Unavailable" size="small" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Commited" size="small" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Available" size="small" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="On-hand"
                                size="small"
                                defaultValue={"--"}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Typography>Variants</Typography>
                <List>
                    {variants.map((variant, index) => {
                        return (
                            <div key={index}>
                                <Divider />
                                <ListItem>
                                    <Box sx={{ width: "100%" }}>
                                        <Variants
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
                                    Variant ({variants.map((a) => a.name).join("-")})
                                    <TableSortLabel />
                                </Box>
                            </TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {getAllCombinations(variants).map((combination, index) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </MiniDrawer>
    );
}
