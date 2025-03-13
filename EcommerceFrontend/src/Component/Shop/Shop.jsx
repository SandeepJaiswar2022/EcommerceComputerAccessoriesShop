import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../State/Product/ProductSlice';
import CustomProduct from '../CustomProduct/CustomProduct';
import { ToastContainer } from 'react-toastify';
import Filter from '../Filter/Filter';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';


function Shop() {
    const products = useSelector(store => store.product.filteredProducts);
    const filters = useSelector(state => state.product.filters);

    const dispatch = useDispatch();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Get the current products to display on the page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleFilter = (brands, price, category) => {
        dispatch(setFilters({ ...filters, brands, price, category }));
    }

    const goToProductView = (productId) => {
        // Navigate to product detail view
    };

    // Pagination control handlers
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const setPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto py-8 px-8 flex flex-col lg:flex-row">
            {/* Filter Section */}
            <ToastContainer autoClose={300} />
            <Filter filterValues={handleFilter} />

            {/* Product Section */}
            <div className="w-full lg:w-3/4 lg:pl-8">
                {currentProducts.length === 0 ? (
                    <p className="text-center text-2xl font-bold mt-32 text-white justify-center items-center w-full">
                        Sorry, no Products available with Selected Filters or Keyword
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentProducts.map((product) => (
                                <CustomProduct
                                    key={product.id}
                                    product={product}
                                    onClick={() => goToProductView(product.id)}
                                />
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex mx-5 mt-8">
                            <button
                                className={`mx-1 px-2 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-500 text-black' : 'bg-gray-200 text-black'}`}
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft />
                            </button>
                            {/* Page numbers */}
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    className={`mx-1 px-3 py-1 font-bold rounded-lg ${currentPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-white'}`}
                                    onClick={() => setPage(number + 1)}
                                >
                                    {number + 1}
                                </button>
                            ))}
                            <button
                                className={`mx-1 px-2 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-500 text-black' : ' bg-gray-200 text-black'}`}
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </>


                )}
            </div>
        </div>
    );
}

export default Shop;
