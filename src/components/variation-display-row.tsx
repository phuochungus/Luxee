import { Variation } from "@/pages";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";

interface VariationDisplayRowProps {
    variation: Variation;
    openEditor: () => void;
}

export function VariationListItemDisplay(props: VariationDisplayRowProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <Typography>{props.variation.name}</Typography>
                <Breadcrumbs>
                    {props.variation.values.map((value, index) => (
                        <Box key={index}>
                            <Typography>{value}</Typography>
                        </Box>
                    ))}
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Box>
                    <Button variant="outlined" onClick={props.openEditor}>
                        Edit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
