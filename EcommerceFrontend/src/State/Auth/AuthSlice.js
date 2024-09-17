import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Config/ApiConfig";
import { toast } from "react-toastify";
import { clearCart } from "../CartItem/CartItemSlice";


export const login = createAsyncThunk("login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, userData)
        const data = await response.data;
        localStorage.setItem(`jwtToken`, data.jwtToken);
        // console.log("Logged In Successfully");
        return data.jwtToken;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    dispatch(clearCart());
    toast.success("Logged Out successfully");

    return true;

});

export const getUserProfile = createAsyncThunk('getUserProfile', async (jwtToken, { rejectWithValue }) => {
    try {
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const response = await axios.get(`${BASE_URL}/myprofile`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const userData = await response.data;
        return userData;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData)
        const data = await response.data;
        // console.log(`Token[After Login]:`, data);
        localStorage.setItem(`jwtToken`, data.jwtToken);
        toast.success("Registered In successfully");
        return data.jwtToken;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const UserAuthentication = createSlice({
    name: `UserAuthentication`,
    initialState: {
        user: null,
        loading: false,
        error: null,
        jwtToken: localStorage.getItem('jwtToken') || null,
        role: localStorage.getItem('role') || null
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwtToken = action.payload;
                state.error = null;
                toast.success('Login successful!');
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                toast.error('Login failed. Please try again.');
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.jwtToken = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.jwtToken = null;
                state.role = null;
                state.user = null;
                state.error = null;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.role = state.user.role;
                // localStorage.setItem(`role`, state.user.role);
                state.error = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.user = null;
                state.error = null;
            })
    }
});



export default UserAuthentication.reducer;