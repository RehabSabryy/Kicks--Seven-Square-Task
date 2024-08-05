import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const RecipesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token')
            const {data} = await axios.get(`https://www.sevensquare.net/api/product/getAllProducts?page=&per_page=&filters=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(data.data)
            // create unique array using set to remove duplicates and get all categories
                const categories = [...new Set(data.data.map((product) => product.product_categories))];
                setCategories(categories);
            }
            catch (error) {
                setError(error.response.data.message)
            }
    }

};