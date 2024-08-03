import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Config/ApiConfig";
import { toast } from "react-toastify";


export const createPayment = createAsyncThunk("createPayment", async (orderId, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        console.log("Create Payment : ", jwtToken);
        const response = await axios.post(`${BASE_URL}/payment/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        if (data.paymentLinkURL) {
            window.location.href = data.paymentLinkURL;
        }
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const updatePayment = createAsyncThunk("updatePayment", async (requestData, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const response = await axios.get(`${BASE_URL}/payment?paymentId=${requestData.paymentId}&orderId=${requestData.orderId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        console.log(`IN UPDATE PAYMENT : ${data}`);
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});