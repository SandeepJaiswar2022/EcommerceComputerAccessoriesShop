import React from 'react'

function Address() {
    return (
        <div class="container mx-auto py-10 px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List of stored Addresses  */}
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg custom-scrollbar h-[calc(100vh-4rem)] overflow-y-scroll">
                <h2 class="text-2xl font-bold text-blue-400 mb-4">Use Below Addresses</h2>
                <div class="space-y-4">

                    {/* Saved addresses */}
                    <div class="bg-gray-700 p-4 rounded-lg flex flex-col space-y-2 shadow-md">
                        <p class="font-semibold">John Doe</p>
                        <p class="text-gray-300">1234 Elm Street, Apt 56 Springfield, IL 62704</p>
                        <p class="text-gray-400">+1 234-567-8901</p>
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">Deliver
                            Here</button>
                    </div>
                    <div class="bg-gray-700 p-4 rounded-lg flex flex-col space-y-2 shadow-md">
                        <p class="font-semibold">Jane Smith</p>
                        <p class="text-gray-300">5678 Oak Avenue Columbus, OH 43215</p>
                        <p class="text-gray-400">+1 987-654-3210</p>
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">Deliver
                            Here</button>
                    </div>
                </div>
            </div>

            {/* Address Form  */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Add New Address</h2>
                <form action="#" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-400 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-400 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-400 mb-1">Address</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-400 mb-1">City</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-400 mb-1">State</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-400 mb-1">Zip Code</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button  */}
                    <div>
                        <button type="submit"
                            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out w-full shadow-md">
                            Deliver Here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Address
