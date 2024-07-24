import React from 'react'

function MyOrders() {
    return (
        <div class="container mx-auto px-4 py-10 md:px-6 md:py-12">
            {/* Filter Section */}
            <div class="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div class="relative w-full md:w-1/2 lg:w-1/3">
                    <label class="text-white text-lg font-bold mb-2 block">Order Status:</label>
                    <div class="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <label class="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" name="orderStatus" value="all" class="form-radio  text-blue-500" />
                            <span class="ml-2">All</span>
                        </label>
                        <label class="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" name="orderStatus" value="pending" class="form-radio text-yellow-500" />
                            <span class="ml-2">Pending</span>
                        </label>
                        <label class="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" name="orderStatus" value="shipped" class="form-radio text-blue-600" />
                            <span class="ml-2">Shipped</span>
                        </label>
                        <label class="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" name="orderStatus" value="delivered" class="form-radio text-green-600" />
                            <span class="ml-2">Delivered</span>
                        </label>
                        <label class="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" name="orderStatus" value="cancelled" class="form-radio
                             text-red-600"/>
                            <span class="ml-2">Cancelled</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div class="custom-scrollbar">
                <div class="grid grid-cols-1 gap-6">
                    {/* Order Card 1 */}
                    <div
                        class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        {/* Product Details */}
                        <div class="flex items-center space-x-4 flex-1">
                            <img src="https://via.placeholder.com/100" alt="Product"
                                class="w-24 h-24 object-cover rounded-md border border-gray-700" />
                            <div>
                                <h3 class="text-lg font-bold text-white">Product Title 1</h3>
                                <p class="text-gray-400">$199.99</p>
                            </div>
                        </div>
                        {/* Order Status and Delivery */}
                        <div class="flex flex-col items-start md:items-end space-y-2">
                            <span class="text-sm font-semibold px-4 py-2 rounded-full text-white bg-blue-600">Shipped</span>
                            <p class="text-gray-400">Expected Delivery on Mar 23</p>
                        </div>
                    </div>

                    <div
                        class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        <div class="flex items-center space-x-4 flex-1">
                            <img src="https://via.placeholder.com/100" alt="Product"
                                class="w-24 h-24 object-cover rounded-md border border-gray-700" />
                            <div>
                                <h3 class="text-lg font-bold text-white">Product Title 2</h3>
                                <p class="text-gray-400">$299.99</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start md:items-end space-y-2">
                            <span
                                class="text-sm font-semibold px-4 py-2 rounded-full text-white bg-yellow-500">Pending</span>
                            <p class="text-gray-400">Expected Delivery on Mar 30</p>
                        </div>
                    </div>

                    <div
                        class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        <div class="flex items-center space-x-4 flex-1">
                            <img src="https://via.placeholder.com/100" alt="Product"
                                class="w-24 h-24 object-cover rounded-md border border-gray-700" />
                            <div>
                                <h3 class="text-lg font-bold text-white">Product Title 3</h3>
                                <p class="text-gray-400">$399.99</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start md:items-end space-y-2">
                            <span
                                class="text-sm font-semibold px-4 py-2 rounded-full text-white bg-green-600">Delivered</span>
                            <p class="text-gray-400">Expected Delivery on Mar 20</p>
                        </div>
                    </div>


                    <div
                        class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        <div class="flex items-center space-x-4 flex-1">
                            <img src="https://via.placeholder.com/100" alt="Product"
                                class="w-24 h-24 object-cover rounded-md border border-gray-700" />
                            <div>
                                <h3 class="text-lg font-bold text-white">Product Title 4</h3>
                                <p class="text-gray-400">$499.99</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start md:items-end space-y-2">
                            <span
                                class="text-sm font-semibold px-4 py-2 rounded-full text-white bg-red-600">Cancelled</span>
                            <p class="text-gray-400">Expected Delivery on N/A</p>
                        </div>
                    </div>

                    <div
                        class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        <div class="flex items-center space-x-4 flex-1">
                            <img src="https://via.placeholder.com/100" alt="Product"
                                class="w-24 h-24 object-cover rounded-md border border-gray-700" />
                            <div>
                                <h3 class="text-lg font-bold text-white">Product Title 5</h3>
                                <p class="text-gray-400">$599.99</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start md:items-end space-y-2">
                            <span class="text-sm font-semibold px-4 py-2 rounded-full text-white bg-blue-600">Shipped</span>
                            <p class="text-gray-400">Expected Delivery on Mar 25</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders
