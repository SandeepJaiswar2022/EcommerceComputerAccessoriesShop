import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, setFilters } from '../../State/Product/ProductSlice';
import CustomProduct from '../CustomProduct/CustomProduct';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Filter from '../Filter/Filter';


function Shop() {
    const products = useSelector(store => store.product.filteredProducts);
    const filters = useSelector(state => state.product.filters);

    const dispatch = useDispatch();

    const handleFilter = (brands, price, category) => {
        // console.log(brands);
        // console.log("\n\n",price);
        // console.log("Category : ",category);

        dispatch(setFilters({ ...filters, brands, price, category }));
    }

    return (
        // < !--Filter and Product Section-- >
        <div className="container mx-auto py-8 px-8 flex flex-col lg:flex-row">
            {/* <!-- Filter Section --> */}
            <ToastContainer autoClose={300} />
            <Filter filterValues={handleFilter} />

            {/* <!-- Product Section --> */}
            <div className="w-full lg:w-3/4 lg:pl-8">
                {/* <!-- Filter Link for Small Screens --> */}
                <div className="block lg:hidden text-right mb-4">
                    <Link href="#" className="text-blue-500">Filters</Link>
                </div>
                {products.length === 0 ? (
                    <p className="text-center text-2xl font-bold mt-32 text-white justify-center items-center w-full">! Sorry, no Products available with Selected Filters or Keyword</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* products Loaded from database */}
                        {products.map((product) => (
                            <CustomProduct
                                key={product.id}
                                product={product}
                                onClick={() => goToProductView(product.id)}
                            />
                        ))}

                        {/* Add more products here */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shop
