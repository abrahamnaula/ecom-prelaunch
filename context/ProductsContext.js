import { createContext, useState, useContext } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children, initialProductsFromServer }) => {
    const [initialProducts, setInitialProducts] = useState(initialProductsFromServer);

    return (
        <ProductsContext.Provider value={{ initialProducts, setInitialProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
