import {
    Box,
    Breadcrumbs,
    Button,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export interface IVariantOption {
    name: string;
    values: string[];
}

export function VariantOption(props: IVariantOption) {
    const [openEditor, setOpenEditor] = React.useState(false);
    const [values, setValues] = React.useState(props.values);
    const [focusIndex, setFocusIndex] = React.useState(-1);

    const handleOpenEditor = () => {
        setOpenEditor(true);
    };

    const handleCloseEditor = () => {
        setOpenEditor(false);
    };

    const handleNewValue = (e: any) => {
        const value = e.data;
        console.log(value);
        if (value == "") {
            return;
        } else {
            e.preventDefault();
            setFocusIndex(values.length);
            setValues([...values, value]);
        }
    };

    return (
        <>
            {openEditor ? (
                <>
                    <Box sx={{ display: "flex" }}>
                        <Box>
                            <Typography>Name</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <TextField size="small" defaultValue={props.name} />
                                <Box>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ ml: 3 }}>
                            <Typography>Values</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {values.map((value, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Box>
                                            <TextField
                                                sx={{ mb: 1 }}
                                                size="small"
                                                defaultValue={value}
                                                autoFocus={index == focusIndex}
                                            />
                                        </Box>
                                        <Box>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                                <Box>
                                    <TextField
                                        sx={{ mb: 1 }}
                                        size="small"
                                        onBeforeInput={(e) => {
                                            handleNewValue(e);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography>{props.name}</Typography>
                            <Breadcrumbs>
                                {values.map((value, index) => (
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
                                <Button variant="outlined" onClick={handleOpenEditor}>
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
}
