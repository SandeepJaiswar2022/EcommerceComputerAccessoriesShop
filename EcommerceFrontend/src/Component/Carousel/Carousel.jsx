import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';





function Carousel() {

    const images = [
        'computerAccess.jpg',
        'keyboard.jpg',
        'laptopAccess.jpg',
        'laptop3.jpg',
        'mouse1.jpg',
        'laptopA2.jpg',
        'laptop4.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 500); // Wait for fade-out effect to complete before changing image
        }, 2000); // Change image every 2 seconds

        return () => clearTimeout(timeout);
    }, [currentImageIndex]);

    return (
        <div className="custom-color mb-12 text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Welcome to Tech Store
                        </h2>
                        <p className="mt-3 text-lg">
                            Discover the best deals on laptops, computers accessories, and more.
                        </p>
                        <div className="mt-8 sm:flex">
                            <div className="rounded-md shadow">
                                <Link
                                    to={`/shop`}
                                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md font-bold text-white btn-bg-color btn-bg-color-hover md:py-4 md:text-lg md:px-10"
                                >
                                    Shop Now
                                </Link>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <Link
                                    to={``}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white font-bold bg-indigo-700 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:ml-10 lg:w-1/2">
                        <img
                            className={`h-96 w-full object-cover sm:h-112 lg:w-full lg:h-112 rounded-lg transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
                            src={images[currentImageIndex]}
                            alt={`Slide ${currentImageIndex}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel
