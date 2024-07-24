import React from 'react'
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../../State/CartItem/CartItemSlice';
import { toast } from 'react-toastify';

function CustomProduct({ product }) {

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const jwtToken = useSelector(state => state.auth.jwtToken);
    const updateCartHandler = () => {
        // console.log(productId);
        if (jwtToken) {
            const request = { productId: product?.id, quantity: 1 };
            dispatch(updateCart({ request, jwtToken }));
            toast.success("Added to Your Cart")
        } else {
            navigateTo(`/signin`);
        }
    }

    const goToProductView = (productId) => {
        navigateTo(`/product/${productId}`)
    }
    return (
        <div className="bg-black cursor-pointer flex-col sm:flex-row p-4 rounded-lg shadow-md group">
            <div className="w-full h-64 relative overflow-hidden rounded-sm">
                <img onClick={() => goToProductView(product?.id)} src={`/ProductImages/${product?.imageUrl}`} alt="Product Image"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                <button onClick={updateCartHandler} className="btn-bg-color btn-bg-color-hover font-medium text-white py-2 hover:font-bold w-full absolute bottom-0 left-0 transform translate-y-full transition-transform duration-700 ease-in-out group-hover:translate-y-0">
                    Add to Cart
                </button>
            </div>
            {/* Div for h3 and p with its own hover effect */}
            <div onClick={() => goToProductView(product?.id)} className='hover-div flex flex-col justify-center items-center mt-4 transition-colors duration-500 ease-in-out'>
                <h3 className="text-xl text-white text-center font-semibold mb-2">
                    {product?.title}
                </h3>
                <p className="text-gray-200 mb-2 text-lg flex items-center">
                    <FaRupeeSign className="mr-1" /> {product?.price}
                </p>

            </div>
        </div>
    );
}


export default CustomProduct
