import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCartItem, getCartItems } from '../../State/CartItem/CartItemSlice';
import CartItem from '../CartItem/CartItem';
import { FaRupeeSign } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify';

function ViewCart() {
    const dispatch = useDispatch();
    const cartItemObj = useSelector(store => store.cartItem?.cartItems); //Obj
    const cartItems = cartItemObj?.cartItems; //Array
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (jwtToken) {
            dispatch(getCartItems(jwtToken));
        }
    }, [dispatch, jwtToken]);

    useEffect(() => {
        localStorage.setItem('currentStep', '0');
        console.log("In Carts : ", localStorage.getItem(`currentStep`));
    }, [navigateTo]);

    const goToShippingAddress = () => {
        localStorage.setItem('currentStep', '1');
        navigateTo(`/address`);
    }

    const deleteCartItemHandler = useCallback(
        (productId) => {
            dispatch(deleteCartItem({ productId, jwtToken }));
        },
        [dispatch, jwtToken]
    );

    if (cartItems?.length === 0) {
        return (
            <>
                <div className="flex space-y-5 flex-col items-center justify-center sm:flex">
                    <h1 className="text-center text-white font-extrabold text-2xl">Your Cart Is Empty!</h1>
                    <div className="rounded-md shadow">
                        <Link
                            to={`/shop`}
                            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md font-bold text-white btn-bg-color btn-bg-color-hover md:py-4 md:text-lg md:px-10"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </>
        )

    }
    return (
        <section className="container mx-auto py-10 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row gap-8">
            <ToastContainer autoClose={700} />
            {/* Product List  */}
            <div className="lg:w-2/3 overflow-y-auto custom-scrollbar h-screen pr-4">
                <div className="space-y-4">
                    {/* Cart Item */}
                    {cartItems?.map((cartItem) => (<CartItem key={cartItem.id} cartItem={cartItem} deleteCartItemHandler={() => deleteCartItemHandler(cartItem.product.id)} />))}
                </div>
            </div>

            {/* Pricing Details  */}
            <div className="lg:w-fit flex flex-col justify-center items-center bg-gray-800 h-fit p-8 rounded-lg sticky lg:top-16 md:static md:top-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-4">Price Details</h2>
                <table className="min-w-full divide-y divide-gray-200">

                    <tbody className="text-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="font-bold text-lg text-gray-300">Price ({cartItemObj?.cartTotalQuantity} items) :</span></td>
                            <td align='right' className="px-6 py-4 whitespace-nowrap"><div className="flex text-white justify-center items-center">
                                <FaRupeeSign /><span className="font-bold text-lg">{cartItemObj?.cartTotalPrice}</span>
                            </div></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-gray-300">Discount :</span></td>
                            <td align='right' className="px-6 py-4 whitespace-nowrap"> <div className='flex text-green-500 justify-center items-center'>-<FaRupeeSign /><span className="font-bold text-lg">{cartItemObj?.cartTotalDiscount}</span></div></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-gray-300">Delivery Charges :</span></td>
                            <td align='center' className="px-6 py-4 whitespace-nowrap"><span className="font-bold text-lg text-yellow-500">FREE</span></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="text-2xl font-bold text-blue-400">Total Amount :</span></td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center space-x-1 text-white items-center">
                                <FaRupeeSign />
                                <span className="text-lg font-bold ">{cartItemObj?.cartTotalPriceAfterDiscount}</span>
                            </div></td>
                        </tr>
                    </tbody>
                </table>
                <Link onClick={goToShippingAddress}
                    className="btn-bg-color text-center btn-bg-color-hover text-white font-bold py-3 px-6 rounded mt-6 w-full transition duration-300 ease-in-out">Place
                    Order</Link>
            </div>

        </section>
    )
}

export default ViewCart
