import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Variation } from "@/pages";
import React from "react";

interface VariationEditRowProps {
    variation: Variation;
    deleteVariation: () => void;
    setVariation: (name: string, values: string[]) => void;
    closeEditor: () => void;
}

export function VariationListItemEdit(props: VariationEditRowProps) {
    const [focusIndex, setFocusIndex] = React.useState(-1);
    const [name, setName] = React.useState(props.variation.name);
    const [values, setValues] = React.useState(props.variation.values);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box>
                    <Typography>Name</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <TextField
                            size="small"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <Box>
                            <IconButton onClick={props.deleteVariation}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        ml: 3,
                    }}
                >
                    <Typography>Values</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {values.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Box>
                                    <TextField
                                        sx={{
                                            mb: 1,
                                        }}
                                        size="small"
                                        value={values[index]}
                                        onChange={(e) => {
                                            setValues(
                                                values.map((value, i) =>
                                                    i == index ? e.target.value : value
                                                )
                                            );
                                        }}
                                        autoFocus={index == focusIndex}
                                    />
                                </Box>
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                            setValues(
                                                values.filter((_, i) => i != index)
                                            );
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                        <Box>
                            <TextField
                                sx={{
                                    mb: 1,
                                }}
                                size="small"
                                onBeforeInput={(e: any) => {
                                    const value = e.data;
                                    if (value == "") {
                                        return;
                                    } else {
                                        e.preventDefault();
                                        setFocusIndex(values.length);
                                        setValues([...values, value]);
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"}>
                <Box>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (
                                props.variation.name == "" &&
                                props.variation.values.length == 0
                            ) {
                                props.deleteVariation();
                            } else {
                                props.closeEditor();
                                setValues(props.variation.values);
                                setName(props.variation.name);
                            }
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            props.setVariation(name, values);
                            props.closeEditor();
                        }}
                        sx={{ ml: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
}
