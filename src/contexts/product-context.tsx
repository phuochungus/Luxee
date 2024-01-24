import { Product } from "@/pages";
import { createContext, useContext, useState } from "react";

interface ProductContextType {
    product: Product | undefined;
    setProducts: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: any) {
    const [product, setProducts] = useState<Product>();

    return (
        <ProductContext.Provider value={{ product, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => {
    const context = useContext(ProductContext);

    if (context === undefined) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }

    return context;
};
