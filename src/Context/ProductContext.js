import React, { createContext,useContext, useState , useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [allProducts,setAllProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [countProduct,setCountProduct] = useState(0)
    const [error,setError] = useState(null)

    useEffect(() => {
        fetchProducts();
    },[])
    const fetchProducts = async (page = 1, perPage = 10) => {
        try {
            const token = localStorage.getItem('token')
            const {data} = await axios.get(`https://www.sevensquare.net/api/product/getAllProducts?page=${page}&per_page=${perPage}&filters=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAllProducts(data.data)
            setCategories(data.data)
            // create unique array using set to remove duplicates and get all categories
                const categories = [...new Set(data.data.map((product) => product.product_categories))];
                setCategories(categories);

            }
            catch (error) {
                setError(error.response.data.message)
            }                
    }
         // count products of each category
         const countProductsByCategory = (category) => {
            return allProducts.filter(product => product.product_categories === category).length;
      };  

    return (
        <ProductContext.Provider value={{allProducts,categories,error,fetchProducts,countProductsByCategory}}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProduct = () => useContext(ProductContext);
