import {
    Box,
    Breadcrumbs,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

export interface IVariant {
    name: string;
    values: string[];
}

export function Variants(props: IVariant) {
    const [openEditor, setOpenEditor] = React.useState(true);

    const handleOpenEditor = () => {
        setOpenEditor(true);
    };

    const handleCloseEditor = () => {
        setOpenEditor(false);
    };

    return (
        <>
            {openEditor ?
                <>
                    <Box sx={{ display: "flex" }}>
                        <Box>

                            <Typography>Name</Typography>
                            <TextField
                                size="small"
                                defaultValue={props.name}
                            />
                        </Box>
                        <Box sx={{ ml: 3 }}>

                            <Typography>Values</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {props.values.map((value, index) => (
                                    <Box>
                                        <TextField
                                            sx={{ mb: 1 }}
                                            key={index}
                                            size="small"
                                            defaultValue={value}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </>
                :
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
                            {props.values.map((value, index) => (
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
                            <Button
                                variant="outlined"
                                onClick={handleOpenEditor}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </Box>

            }
        </>
    );
}
