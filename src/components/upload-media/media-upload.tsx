import { useRef, useState } from "react";
import { Product } from "@/pages";
import { ImagePreview } from "@/components/image-preview/image-preview";
import "./style.css";
import { DeleteHoverButton } from "@/components";

interface MediaUploadProps {
    product: Product;
    setProduct: (product: Product) => void;
}

export function MediaUpload(props: MediaUploadProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<File[]>([]);

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            // const media = [...props.product.media, ...files];
            // props.setProduct({ ...props.product, media });
            setMedia([...media, ...files]);
        }
    };

    return (
        <div>
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
                        setMedia([...media, ...files]);
                    }
                }}
                className="d-flex justify-content-center align-items-center bg-light mb-3"
            >
                <input
                    ref={ref}
                    type="file"
                    accept="video/*,image/*"
                    multiple
                    hidden
                    onChange={addFile}
                />
                <div className="d-flex flex-column flex-wrap align-items-center">
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
                    </div>
                    <p>or</p>
                    <p className="d-flex justify-content-center m-0">
                        drag and drop here
                    </p>
                </div>
            </div>
            {media.length != 0 && (
                <>
                    {media.map((file) => (
                        <div
                            className="card"
                            key={file.name}
                            style={{
                                width: "10rem",
                            }}
                        >
                            <ImagePreview file={file} />
                            <div className="px-2">
                                <p
                                    className="card-text overflow-hidden"
                                    style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {file.name}
                                </p>
                            </div>
                            <div className="d-flex justify-content-end pe-1 pb-1 pt-1">
                                <DeleteHoverButton
                                    onClick={() => {
                                        const newMedia = media.filter(
                                            (f) => f.name != file.name
                                        );
                                        setMedia(newMedia);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
