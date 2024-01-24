import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Product } from "@/pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const router = createBrowserRouter([
    {
        path: "/products/new",
        element: <Product />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
