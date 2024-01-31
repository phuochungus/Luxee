import { Unfetch } from "@/declarations/unfetch.type";
import fetch from "unfetch";

export const fetchBase: Unfetch = (
    url: string,
    options?: {
        method?: string;
        headers?: Record<string, string>;
        credentials?: "include" | "omit";
        body?: Parameters<XMLHttpRequest["send"]>[0];
    }
) => fetch(`${import.meta.env.VITE_BACKEND_BASE_UR}${url}`, options);
