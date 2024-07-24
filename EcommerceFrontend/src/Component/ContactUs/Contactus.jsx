import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-black text-gray-300 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Contact Information */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                        <p className="text-gray-400 mb-4">
                            If you have any questions or need assistance, feel free to reach out to us through the following methods:
                        </p>
                        <ul className="list-disc list-inside text-gray-400">
                            <li>Email: support@yourwebsite.com</li>
                            <li>Phone: +1 234-567-8901</li>
                            <li>Address: 1234 Elm Street, Springfield, IL 62704</li>
                        </ul>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">Send Us a Message</h2>
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
                                <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-400 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
