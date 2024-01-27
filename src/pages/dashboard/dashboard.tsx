import { Sidebar } from "@/components";
import "./style.css";
import { Product } from "@/pages";

export function Dashboard() {
    return (
        <body className="d-flex flex-row">
            <Sidebar />
            <div className="px-5" style={{ width: "100%" }}>
                <Product />
            </div>
        </body>
    );
}
