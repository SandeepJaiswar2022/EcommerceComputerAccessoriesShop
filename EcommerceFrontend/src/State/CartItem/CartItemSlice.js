import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../../Config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";


export const getCartItems = createAsyncThunk("getCartItems", async (jwtToken, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const cartItems = await response.data;
        // console.log("Cart Items : ", cartItems);
        // toast.success('Cart items fetched successfully');
        return cartItems;
    } catch (error) {
        console.log("Error : ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const updateCart = createAsyncThunk('updateCart', async ({ request, jwtToken }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart`, request, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        const data = await response.data;
        return data;
    } catch (error) {
        console.log('Error: ', error.response);

        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
});


export const deleteCartItem = createAsyncThunk(
    'deleteCartItem',
    async ({ productId, jwtToken }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            // console.log("delete cart item called");
            // const data = await response.data;
            toast.success('Item deleted from cart');
            return productId;
        } catch (error) {
            console.error('Error: ', error.response);

            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data);
        }
    }
);

export const CartItem = createSlice({
    name: `CartItem`,
    initialState: {
        cartItems: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cartItems = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
                state.error = null;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;

                state.error = null;
                console.log("Update Cart : ", action.payload);
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems.cartItems = state.cartItems.cartItems
                    .map(item => {
                        if (item.product.id === action.payload) {
                            state.cartItems.cartTotalDiscount -= item.totalPrice - (item.quantity * item.product.discountPrice);
                            state.cartItems.cartTotalPrice -= item.totalPrice;
                            state.cartItems.cartTotalPriceAfterDiscount = state.cartItems.cartTotalPrice - state.cartItems.cartTotalDiscount;
                            state.cartItems.cartTotalQuantity -= item.quantity;

                        }
                        return item;
                    })
                state.cartItems.cartItems = state.cartItems.cartItems.filter(item => item.product.id !== action.payload);
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearCart } = CartItem.actions;
export default CartItem.reducer;