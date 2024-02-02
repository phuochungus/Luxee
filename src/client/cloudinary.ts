import fetch from "unfetch";

export interface Signature {
    timestamp: number;
    signature: string;
}

export function uploadFileToCloudinary(file: File, signData: Signature) {
    const url =
        "https://api.cloudinary.com/v1_1/" +
        import.meta.env.VITE_CLOUD_NAME +
        "/auto/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", import.meta.env.VITE_API_KEY);
    formData.append("timestamp", signData.timestamp.toString());
    formData.append("signature", signData.signature);

    return fetch(url, { method: "POST", body: formData });
}
