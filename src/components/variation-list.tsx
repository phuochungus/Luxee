import { VariationListItem } from "@/components";
import { Variation } from "@/pages";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";

export function VariationList(props: any) {
    return (
        <List component={Box} disablePadding>
            {props.product.variations.map((variation: Variation, index: number) => {
                return (
                    <div key={variation.name}>
                        <Divider />
                        <ListItem>
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <VariationListItem
                                    variation={variation}
                                    openEditor={
                                        variation.name == "" &&
                                        variation.values.length == 0
                                    }
                                    setVariation={(name, values) => {
                                        props.setProduct({
                                            ...props.product,
                                            variations: props.product.variations.map(
                                                (e: Variation, i: number) => {
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
                                        props.setProduct({
                                            ...props.product,
                                            variations: props.product.variations.filter(
                                                (_: any, i: number) => i != index
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
                        props.setProduct({
                            ...props.product,
                            variations: [
                                ...props.product.variations,
                                {
                                    name: "",
                                    values: [],
                                },
                            ],
                        });
                    }}
                >
                    + Add more...
                </Typography>
            </ListItem>
        </List>
    );
}
