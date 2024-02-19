import { Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ImagePreview } from "@/components/upload-media/image-preview";
import { DeleteHoverButton } from "@/components";
import { Signature, uploadFileToCloudinary } from "@/client";
import { createSignature } from "@/client";
import { v4 } from "uuid";

import "./style.css";

enum MediaType {
    IMAGE,
    VIDEO,
}
export interface Media {
    url: string;
    mediaType: MediaType;
    publicId: string;
}

interface FileWrapper {
    file: File;
    id: string;
    mediaType: MediaType;
}

export interface UploadMediaRef {
    sendMedia: (productId: number) => Promise<Media[]>;
}

export const UploadMedia = forwardRef(
    (props: { media: Media[] }, ref: Ref<UploadMediaRef>) => {
        const localRef = useRef<HTMLInputElement>(null);
        const [fileWrappers, setFileWrappers] = useState<FileWrapper[]>([]);

        useEffect(() => {
            const convertMediaToFileWrapper = async (media: Media) => {
                const file = await fetch(media.url).then((res) => res.blob());
                return {
                    id: v4(),
                    file: new File([file], media.url, { type: file.type }),
                    mediaType: media.mediaType,
                } as FileWrapper;
            };
            Promise.all(props.media.map(convertMediaToFileWrapper)).then(
                (fileWrappers) => {
                    setFileWrappers(fileWrappers);
                }
            );
        }, []);

        const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                let files = Array.from(e.target.files);
                let newfileWrappers = files.map((file) => {
                    return {
                        id: v4(),
                        file,
                        mediaType: file.type.startsWith("image/")
                            ? MediaType.IMAGE
                            : MediaType.VIDEO,
                    } as FileWrapper;
                });
                setFileWrappers([...fileWrappers, ...newfileWrappers]);
            }
        };

        useImperativeHandle(ref, () => ({
            sendMedia,
        }));

        async function sendMedia(): Promise<Media[]> {
            if (fileWrappers.length == 0) return [];
            const signature: Signature = await (await createSignature()).json();
            let media = [] as Media[];
            for (let fileWrapper of fileWrappers) {
                const body = await (
                    await uploadFileToCloudinary(fileWrapper.file, signature)
                ).json();
                media.push({
                    url: body.url,
                    mediaType: fileWrapper.mediaType,
                    publicId: body.public_id,
                } as Media);
            }
            return media;
        }

        const dragFile = useRef<number>(-1);
        const dragOverFile = useRef<number>(-1);
        const handleSort = () => {
            if (dragFile.current == -1 || dragOverFile.current == -1) return;
            let newMedia = [...fileWrappers];
            newMedia = newMedia.filter((_, index) => index != dragFile.current);
            newMedia = [
                ...newMedia.slice(0, dragOverFile.current),
                fileWrappers[dragFile.current],
                ...newMedia.slice(dragOverFile.current),
            ];
            setFileWrappers(newMedia);
            dragFile.current = -1;
            dragOverFile.current = -1;
        };

        return (
            <div>
                <div
                    id="drop-area"
                    onClick={() => {
                        if (localRef && localRef.current) localRef.current.click();
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
                            let newfileWrappers = files.map((file) => {
                                return {
                                    id: v4(),
                                    file,
                                } as FileWrapper;
                            });
                            setFileWrappers([...fileWrappers, ...newfileWrappers]);
                        }
                    }}
                    className="d-flex justify-content-center align-items-center bg-light mb-3"
                >
                    <input
                        ref={localRef}
                        type="file"
                        accept="video/*,image/*"
                        multiple
                        hidden
                        onChange={addFile}
                        onClick={(e) => {
                            e.currentTarget.value = "";
                        }}
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
                        <span>or</span>
                        <span>drag and drop here</span>
                    </div>
                </div>
                <div>
                    {fileWrappers.length != 0 && (
                        <div className="row">
                            {fileWrappers.map((file, index) => (
                                <div
                                    key={file.id}
                                    style={{
                                        width: "14.5rem",
                                    }}
                                    draggable
                                    onDragStart={(_) => {
                                        dragFile.current = index;
                                    }}
                                    onDragEnter={(_) => {
                                        dragOverFile.current = index;
                                    }}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <div className="position-relative d-flex flex-row-reverse">
                                        <ImagePreview file={file.file} />
                                        <div className="position-absolute d-flex">
                                            <DeleteHoverButton
                                                onClick={() => {
                                                    const newFileWrappers =
                                                        fileWrappers.filter(
                                                            (f) => f.id != file.id
                                                        );
                                                    setFileWrappers(newFileWrappers);
                                                }}
                                            />
                                        </div>
                                        <h6
                                            className="position-absolute p-1 bg-info"
                                            style={{ left: 0 }}
                                        >
                                            {index}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);
