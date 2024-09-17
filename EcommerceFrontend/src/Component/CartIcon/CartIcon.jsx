import React from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
    // Assume cartItems is an array of items in the cart, useSelector to access state from Redux store
    const cartItems = useSelector((state) => state.cartItem?.cartItems?.cartItems);

    return (
        <div className="relative">
            <FaShoppingCart size={28} className="text-white" />
            {cartItems?.length >= 0 && (
                <div className="absolute -top-1 -right-1 sm:-top-0 sm:-right-0 md:-top-1.5 md:-right-1.5 lg:-top-2 lg:-right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {cartItems?.length}
                </div>
            )}
        </div>
    );
};

export default CartIcon;
