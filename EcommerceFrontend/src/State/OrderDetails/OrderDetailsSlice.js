import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Config/ApiConfig";
import { toast } from "react-toastify";

export const createOrder = createAsyncThunk("createOrder", async (userData, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const response = await axios.post(`${BASE_URL}/order`, userData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        toast.success("Order Placed Successfully");
        return data;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getUserOrderHistory = createAsyncThunk("getUserOrderHistory", async (_, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const response = await axios.get(`${BASE_URL}/order`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        toast.success("Order History Fetched Successfully");
        return data;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const setShippingAddress = createAsyncThunk("setShippingAddress", async (userData, { rejectWithValue }) => {
    try {
        return userData;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});



export const OrderDetails = createSlice({
    name: `OrderDetails`,
    initialState: {
        orderHistory: [],
        order: {},
        shippingAddress: null,
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(setShippingAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setShippingAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.shippingAddress = action.payload;
                state.error = null;
            })
            .addCase(setShippingAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error('Could not set address');
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error('Order could not be placed');
            })
            .addCase(getUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orderHistory = action.payload;
                state.order = null;
                state.error = null;
            })
            .addCase(getUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error('Order could not be placed');
            })
    }
});



export default OrderDetails.reducer;