import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useEffect, useRef } from "react";
import { Product } from "@/pages";

interface MediaUploadInputProps {
    product: Product;
    setProduct: (product: Product) => void;
}

export function MediaUploadInput(props: MediaUploadInputProps) {
    const ref = useRef<HTMLInputElement>(null);

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const media = [...props.product.media, ...files];
            props.setProduct({ ...props.product, media });
        }
    };

    useEffect(() => {
        console.log(props.product.media);
    }, [props.product.media]);

    return (
        <Box
            sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                height: "100px",
                bgcolor: "lightgray",
                border: "2px dashed",
                borderRadius: "25px",
                ":hover": {
                    cursor: "pointer",
                },
            }}
            onClick={() => {
                if (ref && ref.current) ref.current.click();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={(e) => {
                e.preventDefault();
                console.log(e.dataTransfer.files);
                if (e.dataTransfer.items) {
                    const files = Array.from(e.dataTransfer.files);
                    const media = [...props.product.media, ...files];
                    props.setProduct({ ...props.product, media });
                }
            }}
        >
            <input
                ref={ref}
                type="file"
                accept="video/*,image/*"
                multiple
                hidden
                onChange={addFile}
            />
            <Box>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload media
                </Button>
            </Box>
        </Box>
    );
}
