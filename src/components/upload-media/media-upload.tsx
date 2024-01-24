import React, { useRef } from "react";
import { Product } from "@/pages";
import "./style.css";

interface MediaUploadProps {
    product: Product;
    setProduct: (product: Product) => void;
}

export function MediaUpload(props: MediaUploadProps) {
    const ref = useRef<HTMLInputElement>(null);

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const media = [...props.product.media, ...files];
            props.setProduct({ ...props.product, media });
        }
    };

    return (
        <div
            id="drop-area"
            onClick={() => {
                if (ref && ref.current) ref.current.click();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("border-info");
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("border-info");
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("border-info");
                if (e.dataTransfer.items) {
                    const files = Array.from(e.dataTransfer.files);
                    const media = [...props.product.media, ...files];
                    props.setProduct({ ...props.product, media });
                }
            }}
            className="d-flex justify-content-center align-items-center bg-light"
        >
            <input
                ref={ref}
                type="file"
                accept="video/*,image/*"
                multiple
                hidden
                onChange={addFile}
            />
            <div>
                <button type="button" className="btn btn-primary d-flex">
                    <div className="d-flex align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-file-earmark-arrow-up"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                        </svg>
                        <span>Upload files</span>
                    </div>
                </button>
                <p className="d-flex justify-content-center m-0">
                    or drag and drop it here
                </p>
            </div>
        </div>
    );
}
