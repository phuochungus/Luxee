import { Product, Sidebar } from "@/components";
import "./style.css";

export function Dashboard() {
    return (
        <div className="d-flex flex-row">
            <Sidebar />
            <div className="px-4" style={{ width: "100%" }}>
                <Product />
            </div>
        </div>
    );
}
