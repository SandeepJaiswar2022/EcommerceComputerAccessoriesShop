import React, { useState } from 'react'
import { FaPlus, FaMinus, FaRupeeSign, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCart } from '../../State/CartItem/CartItemSlice';


function CartItem({ cartItem, deleteCartItemHandler }) {

    const navigateTo = useNavigate();
    const [addDisable, setAddDisable] = useState(false);
    const [minusDisable, setMinusDisable] = useState(false);
    const jwtToken = useSelector(state => state.auth.jwtToken);
    const dispatch = useDispatch();

    const goToProductView = (productId) => {
        navigateTo(`/product/${productId}`)
    }


    const updateQuntity = (sign) => {
        if (sign === -1) {
            if (cartItem.quantity == 1) {
                console.log(cartItem.quantity);
                toast.error("Cant Reduce further..");
                setMinusDisable(true);
            }
            else {
                if (jwtToken) {
                    const request = { productId: cartItem?.product?.id, quantity: -1 };
                    dispatch(updateCart({ request, jwtToken }));
                    setAddDisable(false);
                    toast.info("Quantity Decreased");
                }
            }
            // handleSetAll();
        }
        else {
            if (cartItem.quantity >= cartItem?.product?.stock) {
                setAddDisable(true);
                toast.error("Product Out of Stock..");
            }
            else {
                if (jwtToken) {
                    const request = { productId: cartItem?.product?.id, quantity: 1 };
                    dispatch(updateCart({ request, jwtToken }));
                    setMinusDisable(false);
                    toast.success("Quantity Increased");
                }
            }
            // handleSetAll();
        }
    }

    // const handleOutOfStock = (quantity) => {
    //     if (quantity > cartItem ? product?.stock) {
    //         toast.error("Out of Stock")
    //     }
    // }
    return (
        <div className="custom-color p-4 rounded-lg flex flex-col md:flex-row items-center">
            <img onClick={() => { goToProductView(cartItem.product?.id) }} src={`/ProductImages/${cartItem.product?.imageUrl}`} alt="Product Image"
                className="w-25 cursor-pointer h-20 object-cover rounded-md mb-4 md:mb-0 md:mr-4" />
            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-lg font-bold text-blue-400">{cartItem.product.title}</h2>
                <p className="text-gray-300 font-bold">Brand: {cartItem?.product?.brand}</p>
                <div className='text-gray-400 flex'><FaRupeeSign className='mt-1' /><p className="line-through">{cartItem.product.price}</p></div>
                <div className='flex'><FaRupeeSign className='mt-1 text-yellow-500' /><p className="text-yellow-500">{cartItem.product.discountPrice} <span className="text-green-500">{cartItem.product.discountPercentage}% off</span></p></div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
                <button onClick={() => updateQuntity(-1)} disabled={minusDisable} className={`text-white font-bold p-2 ${minusDisable ? `bg-indigo-500` : `bg-indigo-700 cursor-pointer hover:bg-indigo-900`} `}><FaMinus /></button>
                <span className="text-xl font-bold text-white">{cartItem?.quantity}</span>
                <button onClick={() => updateQuntity(1)} disabled={addDisable} className={`text-white font-bold p-2 ${addDisable ? `bg-indigo-500` : `bg-indigo-700 cursor-pointer hover:bg-indigo-900`} `}><FaPlus /></button>
                <button onClick={deleteCartItemHandler}
                    className="hover:scale-125 customHover text-2xl transition duration-500 ease-in-out text-white font-bold py-1 px-4 ml-4"><FaTrashAlt /></button>
            </div>
        </div >
    )
}

export default CartItem
