import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProductPage, Error } from "@/pages";
import { ProductLoader } from "@/routes/loaders";

const router = createBrowserRouter([
    {
        errorElement: <Error />,
        children: [
            {
                path: "/products/:id",
                element: <ProductPage />,
                loader: ProductLoader,
            },
        ],
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}
