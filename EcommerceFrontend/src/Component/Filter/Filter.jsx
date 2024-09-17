import { FaChevronDown, FaChevronUp, FaAlignLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../State/Product/ProductSlice';


function Filter({ filterValues }) {
    const [isOpen, setIsOpen] = useState({
        brands: false,
        availability: false,
        price: false,
        category: false
    });
    const priceRanges = [0, 40, 60, 80, 100]
    // ₹
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
        // console.log("Get All Product Called ");
    }, [])

    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        filterValues(selectedBrands, selectedPrice, selectedCategory);
    }, [selectedBrands, setSelectedBrands, selectedPrice, setSelectedPrice, selectedCategory, setSelectedCategory])

    const toggleSection = (section) => {
        setIsOpen(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const handlePriceChange = (price) => {
        setSelectedPrice(price);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    const handleAvailabilityChange = (availability) => {
        setSelectedAvailability(availability);
        console.log("Availability in filter : ", selectedAvailability);
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) :
                [brand, ...prev]
        );
    };

    const clearFilters = () => {
        setSelectedPrice(null);
        setSelectedAvailability([]);
        setSelectedBrands([]);
        setSelectedCategory(null);
    };

    return (
        <div className="w-full lg:w-1/4 mt-4 lg:block h-fit hidden custom-color text-white p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaAlignLeft className="mr-4 text-white" />
                Filters
            </h2>
            <div className="border-b border-gray-500 pb-4 mb-4" />

            <div className="mb-4 border-b border-gray-500 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('category')}>
                    <h3 className="text-lg font-semibold flex items-center">
                        Category
                    </h3>
                    {isOpen.category ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isOpen.category && (
                    <div className="space-y-2 mt-2">
                        {['Laptops', 'Computer Accessories', 'Mobiles', 'Home Appliances'].map(category => (
                            <label key={category} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    checked={selectedCategory === category}
                                    onChange={() => handleCategoryChange(category)}
                                    className="form-radio h-4 w-4 border-gray-600 text-blue-500 mr-2"
                                />
                                <span className={selectedCategory === category ? 'text-blue-500 font-semibold ml-2' : 'ml-2'}>

                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4 border-b border-gray-500 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('price')}>
                    <h3 className="text-lg font-semibold flex items-center">
                        Price
                    </h3>
                    {isOpen.price ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isOpen.price && (
                    <div className="space-y-2 mt-2">
                        {priceRanges.map(price => (
                            <label key={price} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="price"
                                    value={price}
                                    checked={selectedPrice === price}
                                    onChange={() => handlePriceChange(price)}
                                    className="form-radio h-4 w-4 border-gray-600 text-blue-500 mr-2"
                                />
                                <span className={selectedPrice === price ? 'text-blue-500 font-semibold ml-2' : 'ml-2'}>

                                    {price === 0 ? (
                                        'Under 40K'
                                    ) : price === 100 ? (
                                        'Above  100K'
                                    ) : (
                                        ` ${price}K -  ${price + 20}K`
                                    )}
                                    {/*  */}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4 border-b border-gray-500 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('brands')}>
                    <h3 className="text-lg font-semibold">
                        Brands
                    </h3>
                    {isOpen.brands ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isOpen.brands && (
                    <div className="space-y-2 mt-2">
                        {['Apple', 'Dell', 'HP', 'Lenovo'].map(brand => (
                            <label key={brand} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                    className="form-checkbox h-4 w-4 border-gray-600 mr-2 checked:bg-blue-500 checked:border-transparent"
                                />
                                <span className={selectedBrands.includes(brand) ? 'text-blue-500 font-semibold ml-2' : 'ml-2'}>
                                    {brand}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4 border-b border-gray-500 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('availability')}>
                    <h3 className="text-lg font-semibold">
                        Availability
                    </h3>
                    {isOpen.availability ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isOpen.availability && (
                    <div className="space-y-2 mt-2">
                        {['Include Out of Stock'].map(status => (
                            <label key={status} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedAvailability.includes(status)}
                                    onChange={() => handleAvailabilityChange(status)}
                                    className="form-checkbox h-4 w-4 border-gray-600 mr-2 checked:bg-blue-500 checked:border-transparent"
                                />
                                <span className={selectedAvailability.includes(status) ? 'text-blue-500 font-semibold ml-2' : 'ml-2'}>
                                    {status}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={clearFilters}
                className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 focus:outline-none"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Filter;
