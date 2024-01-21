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
import { VariationList } from "@/pages";

interface VariationRowProps extends VariationList {
    index: number;
    openEditor?: boolean;
    saveChange: (name: string, values: string[]) => void;
    deleteRow: () => void;
}

export function VariationRow(props: VariationRowProps) {
    const [openEditor, setOpenEditor] = React.useState(props.openEditor ?? false);
    const [focusIndex, setFocusIndex] = React.useState(-1);
    const [draftVariationList, setDraftVariation] = React.useState<VariationList>({
        name: props.name,
        values: props.values,
    });

    const handleNewValue = (e: any) => {
        const value = e.data;
        if (value == "") {
            return;
        } else {
            e.preventDefault();
            setFocusIndex(draftVariationList.values.length);

            setDraftVariation({
                ...draftVariationList,
                values: [...draftVariationList.values, value],
            });
        }
    };

    return (
        <Box>
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
                                <TextField
                                    size="small"
                                    value={draftVariationList.name}
                                    onChange={(e) => {
                                        setDraftVariation({
                                            ...draftVariationList,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                <Box>
                                    <IconButton onClick={props.deleteRow}>
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
                                {draftVariationList.values.map((_, index) => (
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
                                                value={draftVariationList.values[index]}
                                                onChange={(e) => {
                                                    setDraftVariation({
                                                        ...draftVariationList,
                                                        values: draftVariationList.values.map(
                                                            (value, i) =>
                                                                i == index
                                                                    ? e.target.value
                                                                    : value
                                                        ),
                                                    });
                                                }}
                                                autoFocus={index == focusIndex}
                                            />
                                        </Box>
                                        <Box>
                                            <IconButton
                                                onClick={() => {
                                                    setDraftVariation({
                                                        ...draftVariationList,
                                                        values: draftVariationList.values.filter(
                                                            (_, i) => i != index
                                                        ),
                                                    });
                                                }}
                                            >
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
                    <Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                props.saveChange(
                                    draftVariationList.name,
                                    draftVariationList.values
                                );
                                setOpenEditor(false);
                            }}
                            sx={{ mr: 3 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                if (props.name == "" && props.values.length == 0) {
                                    props.deleteRow();
                                } else {
                                    setDraftVariation({
                                        name: props.name,
                                        values: props.values,
                                    });
                                }
                            }}
                        >
                            Cancel
                        </Button>
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
                                    onClick={() => setOpenEditor(true)}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}
