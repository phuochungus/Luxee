import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddProduct } from "./pages/add-product";
import MiniDrawer from "./components/drawer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MiniDrawer />,
    },
    {
        path: "/products/new",
        element: <AddProduct />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
