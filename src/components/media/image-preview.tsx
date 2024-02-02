import { useEffect, useState } from "react";

export function ImagePreview({ file }: { file: File }) {
    const [src, setSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }, [file]);

    return <img className="img-thumbnail border-0" draggable={false} src={src} alt={file.name} />;
}
