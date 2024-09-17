import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../../Config/ApiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



export const getProductById = createAsyncThunk("getProductById", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId}`);
        const product = await response.data;
        console.log("Product By Id called");
        return product;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getAllProducts = createAsyncThunk("allproducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        const products = await response.data;
        return products;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk("updateProduct", async (product, { rejectWithValue }) => {
    try {
        console.log("Admin : Product update, ", product);
        const { id, ...productRequest } = product;
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.put(`${BASE_URL}/products/${id}`,
            productRequest,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        toast.success("Product Updated");
        return response.data;

    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const addProduct = createAsyncThunk("addProduct", async (product, { rejectWithValue }) => {
    try {
        console.log("Admin : Add Product, ", product);

        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.post(`${BASE_URL}/products`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        return response.data;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (productId, { rejectWithValue }) => {
    try {
        console.log("Admin : Product Delete, ", productId);
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.delete(`${BASE_URL}/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        return productId;

    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const Product = createSlice({
    name: `Product`,
    initialState: {
        products: [],
        product: {},
        filters: {
            brands: [],
            category: null,
            price: null,
            keyword: ''
        },
        filteredProducts: [],
        loading: false,
        error: null,
    },

    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
            const { brands, price, keyword, category } = state.filters;
            let priceMatch = true;

            state.filteredProducts = state.products.filter(product => {

                //Brand Match
                const brandMatch = brands.length === 0 || brands.includes(product.brand);

                //Price Match
                if (price !== null) {
                    switch (price) {
                        case 0:
                            priceMatch = product.price >= 0 && product.price < 40000;
                            break;
                        case 40:
                            priceMatch = product.price >= 40000 && product.price < 60000;
                            break;
                        case 60:
                            priceMatch = product.price >= 60000 && product.price < 80000;
                            break;
                        case 80:
                            priceMatch = product.price >= 80000 && product.price < 100000;
                            break;
                        case 100:
                            priceMatch = product.price >= 100000;
                            break;
                        default:
                            priceMatch = true; // If no matching case, include all
                            break;
                    }
                }

                // Keyword Match
                const keywordMatch = !keyword || product.title.toLowerCase().includes(keyword.toLowerCase()) || product.description.toLowerCase().includes(keyword.toLowerCase()) || product.category.toLowerCase().includes(keyword.toLowerCase());

                //Category Match
                const categoryMatch = !category || product.category.toLowerCase() === category.toLowerCase();

                return brandMatch && priceMatch && keywordMatch && categoryMatch;
            });
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                console.log("called getAllProduct");

            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.product = null;
                state.products = action.payload;
                state.filteredProducts = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.product = null;
                state.products = [];
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.product = null;
                state.products = [];
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                console.log("Got it , ", action.payload.id);

                state.products = state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
                state.filteredProducts = state.filteredProducts.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
                toast.success('Updated Successfully');
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error("Unable to Update")
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                console.log("Got it in addcase, ", action.payload.id);
                state.products.push(action.payload);
                toast.success('Product Added Successfully');
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error("Unable to Add Product Server Error")
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = state.products.filter(product =>
                    product.id !== action.payload);
                state.filteredProducts = state.filteredProducts.filter(product =>
                    product.id === action.payload);
                toast.success("Product Deleted Successfully");
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error("Unable to Update")
            })
    }
});

export const { setFilters } = Product.actions;

export default Product.reducer;