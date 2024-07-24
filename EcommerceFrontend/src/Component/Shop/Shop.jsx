import React, { useEffect, useState } from 'react'
import Product from '../CustomProduct/CustomProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../State/Product/ProductSlice';
import CustomProduct from '../CustomProduct/CustomProduct';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Shop() {
    const dispatch = useDispatch();
    const product = useSelector(store => store.product);


    useEffect(() => {
        dispatch(getAllProducts());
        console.log("Get All Product Called ");
    }, [])


    return (
        // < !--Filter and Product Section-- >
        <div className="container mx-auto py-8 px-8 flex flex-col lg:flex-row">
            {/* <!-- Filter Section --> */}
            <ToastContainer autoClose={1000} />
            <div className="w-full lg:w-1/4 lg:block hidden custom-color text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Price</h3>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> Under $500
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> $500 - $1000
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> $1000 - $1500
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> $1500+
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Brands</h3>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> Apple
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> Dell
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> HP
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> Lenovo
                        </label>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Availability</h3>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> In Stock
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> Out of Stock
                        </label>
                    </div>
                </div>
            </div>

            {/* <!-- Product Section --> */}
            <div className="w-full lg:w-3/4 lg:pl-8">
                {/* <!-- Filter Link for Small Screens --> */}
                <div className="block lg:hidden text-right mb-4">
                    <a href="#" className="text-blue-500">Filters</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* <!-- Repeat this div for each product --> */}

                    {product.products.map((product) => (<CustomProduct key={product.id} product={product} onClick={() => goToProductView(product.id)} />))}

                    {/* <!-- Add more products here --> */}
                </div>
            </div>
        </div>
    )
}

export default Shop
