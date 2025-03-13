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

export const getOrderByOrderId = createAsyncThunk("getOrderById", async (orderId, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const response = await axios.get(`${BASE_URL}/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        console.log(`Order with ${orderId} fetched Successfully`);
        return data;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getUserOrderHistory = createAsyncThunk("getUserOrderHistory", async (role, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        console.log("Role is : ", role);

        if (role === "USER") {
            const response = await axios.get(`${BASE_URL}/order`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const data = await response.data;
            toast.success("User Order History Fetched");

            return data;
        }
        else if (role === 'ADMIN') {
            const response = await axios.get(`${BASE_URL}/admin/order`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const data = await response.data;
            // toast.success("Order History Fetched");
            return data;
        }
        return null;

    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const changeOrderStatus = createAsyncThunk("changeOrderStatus", async (currentStatus, { rejectWithValue }) => {
    try {
        const jwtToken = localStorage.getItem(`jwtToken`);
        if (!jwtToken) {
            console.log("No Token Found");
            throw new Error('No Token Found');
        }
        const { role, orderStatus, orderId } = currentStatus;
        const orderstatus = orderStatus.toUpperCase();


        const response = await axios.put(`${BASE_URL}/admin/order/${orderStatus}/${orderId}`, null, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.data;
        toast.success(data);
        return ({ orderId, orderstatus });

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
        purchasedOrderedItems: [],
        filteredOrderedItems: [],
        order: {},
        orderStatus: null,
        shippingAddress: null,
        loading: false,
        error: null,
    },

    reducers: {
        setFiltersOnOrderItems: (state, action) => {
            state.orderStatus = action.payload;
            if (action.payload !== 'ALL') {
                state.filteredOrderedItems = state.purchasedOrderedItems.filter(item => item.orderStatus === state.orderStatus);
            }
            else {
                state.filteredOrderedItems = state.purchasedOrderedItems;
            }
        }
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
            .addCase(getOrderByOrderId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderByOrderId.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(getOrderByOrderId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.order.orderItems = state.order.orderItems.map(item => item.id === action.payload.orderId ? { ...item, orderStatus: action.payload.orderstatus } : item);
                state.error = null;
            })
            .addCase(changeOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orderHistory = action.payload;
                state.filteredOrderedItems = action.payload.reduce((acc, order) => {
                    // Spread each product and add orderDate and orderTime to each product
                    const productsWithOrderInfo = order.orderItems.map((product) => ({
                        ...product,
                        orderDate: order.orderDate,
                        orderTime: order.orderTime,
                    }));

                    return [...acc, ...productsWithOrderInfo];
                }, []);
                state.purchasedOrderedItems = action.payload.reduce((acc, order) => {
                    // Spread each product and add orderDate and orderTime to each product
                    const productsWithOrderInfo = order.orderItems.map((product) => ({
                        ...product,
                        orderDate: order.orderDate,
                        orderTime: order.orderTime,
                    }));

                    return [...acc, ...productsWithOrderInfo];
                }, []);
                // state.orderHistory = action.payload;
                state.order = null;
                state.error = null;
            })
            .addCase(getUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error('Order could not be fetched');
            })
    }
});


export const { setFiltersOnOrderItems } = OrderDetails.actions;
export default OrderDetails.reducer;