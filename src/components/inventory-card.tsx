import { Box, Typography, Grid, TextField } from "@mui/material";

export function InventoryCard(props: any) {
    return (
        <Box>
            <Typography
                sx={{
                    mt: 2,
                    mb: 1,
                }}
            >
                Inventory
            </Typography>
            <Box>
                <Grid container spacing={2} columnSpacing={1}>
                    <Grid item xs={3}>
                        <TextField
                            label="SKU"
                            size="small"
                            value={props.product.sku}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
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
                            value={props.product.unavailable}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    unavailable: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Commited"
                            size="small"
                            value={props.product.commited}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    commited: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Available"
                            size="small"
                            value={props.product.available}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    available: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="On-hand"
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                            value={
                                +props.product.available +
                                +props.product.unavailable +
                                +props.product.commited
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
