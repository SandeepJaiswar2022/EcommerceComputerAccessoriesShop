import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthentication } from "./Auth/AuthSlice";
import { Product } from "./Product/ProductSlice";
import { CartItem } from "./CartItem/CartItemSlice";
import { OrderDetails } from "./OrderDetails/OrderDetailsSlice";



export const Store = configureStore({
    reducer: {
        auth: UserAuthentication.reducer,
        product: Product.reducer,
        cartItem: CartItem.reducer,
        orderDetails: OrderDetails.reducer,
    }
})