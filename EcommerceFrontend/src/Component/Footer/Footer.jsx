import React from 'react'
import { FaTwitter, FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="text-white bg-black mt-auto pt-10 sm:pt-12">
            <div className="border-t border-gray-700"></div>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Tech Mart</h4>
                        <p className="text-gray-400">
                            Your go-to store for all things tech. From the latest gadgets to essential accessories, we have
                            it all.
                        </p>
                    </div>

                    {/*Quick Links*/}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="text-gray-400">
                            <li className="mb-2"><Link to={``} className="hover:text-gray-300">Home</Link></li>
                            <li><Link to={``} className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
                        <ul className="text-gray-400">
                            <li className="mb-2"><Link to={``} className="hover:text-gray-300">FAQs</Link></li>
                            <li className="mb-2"><Link to={``} className="hover:text-gray-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link to={``} className="text-2xl text-gray-400 hover:text-gray-300">
                                <FaTwitter />
                            </Link>
                            <Link to={``} className="text-2xl text-gray-400 hover:text-gray-300">
                                <FaFacebookSquare />
                            </Link>
                            <Link to={``} className="text-2xl text-gray-400 hover:text-gray-300">
                                <FaLinkedin />
                            </Link>
                            <Link to={``} className="text-2xl text-gray-400 hover:text-gray-300">
                                <FaInstagram />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer >
    )
}

export default Footer
