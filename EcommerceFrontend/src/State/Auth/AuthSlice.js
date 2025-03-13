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
        toast.success("Logged In Successfully");
        return data.jwtToken;
    } catch (error) {
        console.log("Error : ", error.response.data);
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
    // console.log("logged out");
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
        localStorage.setItem(`jwtToken`, data.jwtToken);
        console.log("User Data : ", userData);

        // toast.success("Registered successfully");
        return data.jwtToken;
    } catch (error) {
        // console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getAllUserIfAdmin = createAsyncThunk("getAllUserIfAdmin", async (role, { rejectWithValue }) => {
    try {
        // console.log("Admin : Get All Users ");

        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken !== null && role === 'ADMIN') {
            const response = await axios.get(`${BASE_URL}/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const updateUserRole = createAsyncThunk("updateUserRole", async (data, { rejectWithValue }) => {
    try {
        const { userId, userRole } = data;
        // console.log("in reducer data : ", data);

        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.put(`${BASE_URL}/admin/users/${userId}/${userRole}`,
            null,
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

export const deleteUserIfAdmin = createAsyncThunk("deleteUserIfAdmin", async (userId, { rejectWithValue }) => {
    try {

        console.log("Admin : User Delete, ", userId);

        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.delete(`${BASE_URL}/admin/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        toast.success("User Deleted Successfully");
        return userId;

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
        role: localStorage.getItem('role') || null,
        users: []
    },
    reducers: {
        // Action to clear error
        clearError: (state) => {
            state.error = null;
        }
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
                // toast.success('Login successful');
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
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
                state.error = action.payload;
                console.log("errsroors:", action.payload);

                toast.error(`${action.payload} sign in to continue`);

            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.jwtToken = null;
                state.role = "noRole";
                state.user = null;
                state.error = null;
                toast.success("User Logged Out");
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
            .addCase(getAllUserIfAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUserIfAdmin.fulfilled, (state, action) => {
                state.loading = false;
                if (state.role === 'ADMIN') {
                    state.users = action.payload.filter(user => user.email !== state.user.email);
                    // toast.success('Users fetched Successfully')
                }
                else {
                    state.users = null;
                }
                state.error = null;
            })
            .addCase(getAllUserIfAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.error = null;
            })
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
                toast.success('Users Role Updated')
                state.error = null;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.error = null;
            })
            .addCase(deleteUserIfAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserIfAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = state.users.filter(user => user.id !== action.payload);

            })
            .addCase(deleteUserIfAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error("Unable to Delete Server Error")
            })
    }
});


export const { clearError } = UserAuthentication.actions;
export default UserAuthentication.reducer;