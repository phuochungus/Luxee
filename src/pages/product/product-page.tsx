import { Product, Sidebar } from "@/components";
import "./style.css";

export function ProductPage() {
    return (
        <div
            className="d-flex flex-row"
            style={{
                width: "100%",
            }}
        >
            <Sidebar name={"Products"} />
            <Product />
        </div>
    );
}
