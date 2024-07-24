import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../../Config/ApiConfig";
import axios from "axios";



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

export const Product = createSlice({
    name: `Product`,
    initialState: {
        products: [],
        product: {},
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.product = null;
                state.products = action.payload;
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
    }
});

export default Product.reducer;