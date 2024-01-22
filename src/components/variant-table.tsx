import { Variant, Variation } from "@/pages";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";

export function VariantTable(props: any) {
    return (
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
                                {props.product.variations
                                    .map((a: Variation) => a.name)
                                    .join("-")}
                                )
                                <TableSortLabel />
                            </Box>
                        </TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.product.variants.map((variant: Variant, index: number) => (
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
    );
}
