import { Box, Typography, Grid, TextField } from "@mui/material";

export function PricingCard(props: any) {
    return (
        <Box>
            <Typography>Pricing</Typography>
            <Box
                sx={{
                    mt: 1,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={3} width={"auto"}>
                        <TextField
                            label="Price"
                            size="small"
                            required
                            value={props.product.price}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
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
                            value={props.product.compareAt}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
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
                            value={props.product.cost}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    cost: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={3} width={"auto"}>
                        <TextField
                            label="Profit"
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                            value={
                                parseFloat(props.product.price.toString()) -
                                parseFloat(props.product.cost.toString())
                            }
                        />
                    </Grid>
                    <Grid item xs={3} width={"auto"}>
                        <TextField
                            label="Margin"
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                            value={
                                isNaN(
                                    (parseFloat(props.product.price.toString()) -
                                        parseFloat(props.product.cost.toString())) /
                                        parseFloat(props.product.price.toString())
                                )
                                    ? "--"
                                    : `${(
                                          ((parseFloat(props.product.price.toString()) -
                                              parseFloat(props.product.cost.toString())) /
                                              parseFloat(
                                                  props.product.price.toString()
                                              )) *
                                          100
                                      ).toFixed(2)}%`
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
