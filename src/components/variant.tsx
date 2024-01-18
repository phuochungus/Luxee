import { Box, Breadcrumbs, Button, TextField, Typography } from "@mui/material";
import React from "react";


interface VariantProps {
    name: string;
    values: string[];
}

export function Variants(props: VariantProps) {
    const [openEditor, setOpenEditor] = React.useState(true);

    const handleOpenEditor = () => {
        setOpenEditor(true);
    }

    const handleCloseEditor = () => {
        setOpenEditor(false);
    }

    return (<>
        {openEditor ?
            <>
                <TextField label="Name" size="small" defaultValue={props.name} required />
                
            </>
            :
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between" }}>
                <Box>
                    <Typography>{props.name}</Typography>
                    <Breadcrumbs>
                        {props.values.map((value, index) =>
                            <Box key={index}>
                                <Typography>{value}</Typography>
                            </Box>
                        )}
                    </Breadcrumbs>
                </Box>
                <Box sx={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}>
                    <Box>
                        <Button variant="outlined" onClick={handleOpenEditor}>Edit</Button>
                    </Box>
                </Box>
            </Box>
        }
    </>
    )
}