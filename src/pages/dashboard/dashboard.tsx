import { Product, Sidebar } from "@/components";
import "./style.css";

export function Dashboard() {
    return (
        <div
            className="d-flex flex-row"
            style={{
                width: "100%",
            }}
        >
            <Sidebar />
            <Product />
        </div>
    );
}
