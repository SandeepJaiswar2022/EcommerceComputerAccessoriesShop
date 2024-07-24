import React from 'react'

function AfterOrderPlaced() {
    return (
        <div class="container mx-auto py-10 px-4 md:px-8 lg:px-16">
            <div class="grid grid-cols-1 gap-8">
                {/* Cart 1  */}
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Details  */}
                    <div class="flex items-center space-x-4">
                        <img src="https://via.placeholder.com/80" alt="Product"
                            class="w-20 h-20 object-cover rounded-md border border-gray-700" />
                        <div>
                            <h3 class="text-lg font-bold text-white">Product Title</h3>
                            <p class="text-gray-400">Brand: XYZ</p>
                            <p class="text-blue-400 font-semibold">$299.99</p>
                        </div>
                    </div>
                    {/* Person Data */}
                    <div class="flex flex-col space-y-4">
                        <h4 class="text-lg font-bold text-white">Person Details</h4>
                        <p class="text-gray-400">Name: John Doe</p>
                        <p class="text-gray-400">Address: 1234 Elm Street, Springfield, IL 62704</p>
                        <p class="text-gray-400">Phone: +1 234-567-8901</p>
                    </div>
                </div>
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="flex items-center space-x-4">
                        <img src="https://via.placeholder.com/80" alt="Product"
                            class="w-20 h-20 object-cover rounded-md border border-gray-700" />
                        <div>
                            <h3 class="text-lg font-bold text-white">Product Title</h3>
                            <p class="text-gray-400">Brand: ABC</p>
                            <p class="text-blue-400 font-semibold">$399.99</p>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <h4 class="text-lg font-bold text-white">Person Details</h4>
                        <p class="text-gray-400">Name: Jane Smith</p>
                        <p class="text-gray-400">Address: 5678 Oak Avenue, Columbus, OH 43215</p>
                        <p class="text-gray-400">Phone: +1 987-654-3210</p>
                    </div>
                </div>
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="flex items-center space-x-4">
                        <img src="https://via.placeholder.com/80" alt="Product"
                            class="w-20 h-20 object-cover rounded-md border border-gray-700" />
                        <div>
                            <h3 class="text-lg font-bold text-white">Product Title</h3>
                            <p class="text-gray-400">Brand: DEF</p>
                            <p class="text-blue-400 font-semibold">$199.99</p>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <h4 class="text-lg font-bold text-white">Person Details</h4>
                        <p class="text-gray-400">Name: Emily Davis</p>
                        <p class="text-gray-400">Address: 9876 Pine Road, Seattle, WA 98101</p>
                        <p class="text-gray-400">Phone: +1 456-789-0123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AfterOrderPlaced
