import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../State/Product/ProductSlice';
import { FaRupeeSign } from 'react-icons/fa';
import { updateCart } from '../../State/CartItem/CartItemSlice';
import { toast, ToastContainer } from 'react-toastify';


function ViewProduct() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(store => store.product)
    const navigateTo = useNavigate();
    const jwtToken = useSelector(state => state.auth.jwtToken);

    const updateCartHandler = () => {
        // console.log(productId);
        if (jwtToken) {
            const request = { productId: productId, quantity: 1 };
            dispatch(updateCart({ request, jwtToken }));
            toast.success("Added to Your Cart");
        } else {
            navigateTo(`/signin`);
        }
    }

    useEffect(() => {
        dispatch(getProductById(productId));
    }, [productId])

    if (product.loading) {
        return <h1 className="text-center text-white font-extrabold text-2xl">...loading</h1>
    }


    return (
        // <!-- Product Section -->
        <section className="container mb-6 mx-auto py-10 px-4 md:px-8 lg:px-16">
            <ToastContainer autoClose={700} />
            <div className="grid mb-28 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10">
                {/* <!-- Product Image --> */}
                <div className="flex justify-center rounded-md items-center bg-white">
                    <div className="w-96 h-96 rounded-md relative overflow-hidden">
                        <img
                            src={`/ProductImages/${product.product?.imageUrl}`}
                            alt="Product Image"
                            className="w-full h-full cursor-pointer object-cover rounded-md shadow-lg transform transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>

                {/* <!-- Product Details --> */}
                <div className="p-4 ">
                    <h1 className="text-4xl font-bold mb-4 text-indigo-400">{product.product?.title}</h1>
                    <p className="text-xl font-bold text-gray-300 mb-2">Brand: <span className="italic text-indigo-500">{product.product?.brand}</span></p>
                    <div className='flex'><FaRupeeSign className="text-yellow-500 text-xl mt-1 " /><p className="text-2xl text-yellow-500 mb-4">{product.product?.price}</p></div>
                    <p className="mb-6 text-gray-200">{product.product?.description}</p>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2 text-blue-400">Features:</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>Backlit Keyboard</li>
                            <li>High-Resolution Display</li>
                            <li>Fast Charging</li>
                            <li>Long Battery Life</li>
                            <li>Lightweight Design</li>
                            <li>HD Webcam</li>
                        </ul>
                    </div>

                    <button onClick={updateCartHandler} className="btn-bg-color btn-bg-color-hover text-white font-bold py-2 px-6 rounded mt-4 transition duration-300 ease-in-out">Add to Cart</button>
                </div>
            </div>
            {/* <ProductSlider title={`SIMILAR PRODUCTS`} /> */}
        </section>

    )
}

export default ViewProduct
