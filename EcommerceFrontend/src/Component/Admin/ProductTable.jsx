import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts, getProductById, updateProduct } from "../../State/Product/ProductSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ProductTable = () => {
    const productState = useSelector(store => store.product);
    const auth = useSelector(state => state.auth);
    const [rowsLimit] = useState(4);
    const [rowsToShow, setRowsToShow] = useState(productState.products.slice(0, rowsLimit));
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage] = useState(Math.ceil(productState.products?.length / rowsLimit));
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = productState.products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = productState.products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = productState.products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    useMemo(() => {
        setCustomPagination(
            Array(Math.ceil(productState.products?.length / rowsLimit)).fill(null)
        );
    }, []);


    const dispatch = useDispatch();

    const product = useSelector(store => store.product.product);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [price, setPriceChange] = useState(null);
    const [newProduct, setNewProduct] = useState({});
    const [productIdToDelete, setProductId] = useState(null);


    useEffect(() => {
        if (product) {
            setNewProduct(product);
            setDiscountPrice(product?.discountPrice);
            setPriceChange(product?.price);
        }
        if (auth?.role) {
            console.log("teri j", auth?.role);
            dispatch(getAllProducts(auth?.role));
        }
    }, [product, auth?.role]);

    const handleAlertOnDelete = (productId) => {
        setShowAlert(true);
        setProductId(productId);
    }

    const handleDelete = () => {
        setShowAlert(false);
        dispatch(deleteProduct(productIdToDelete));
    }
    const handleUpdateForm = (productId) => {
        // console.log("product id to update : ", productId);
        dispatch(getProductById(productId)); //this will fetch the product
        setShowModal(true);
    };

    const handleUpdate = () => {
        // console.log("Product to update : ", newProduct);

        dispatch(updateProduct(newProduct));
        setShowModal(false);
    }

    useEffect(() => {
        setRowsToShow(productState.products.slice(0, rowsLimit));
    }, [productState.products, rowsLimit]);


    // input changes to update newProduct state
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewProduct({
            ...newProduct,
            [name]: value,
        });
        if (name === 'price' || name === 'discountPercentage') {
            const updatedPrice = name === 'price' ? value : newProduct.price;
            setPriceChange(updatedPrice);
            const updatedDiscountPercentage = name === 'discountPercentage' ? value : newProduct.discountPercentage;

            // Calculate the discount price
            const calculatedDiscountPrice = updatedPrice && updatedDiscountPercentage
                ? Math.round((updatedPrice - (updatedPrice * updatedDiscountPercentage / 100)))
                : '';

            setDiscountPrice(calculatedDiscountPrice);
            // Update the discountPrice in the state
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                discountPrice: calculatedDiscountPrice,
            }));
        }
    };

    if (productState.loading) {
        return (
            <h1>
                Loading...
            </h1>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">Update Product</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black text-center justify-center items-center flex h-8 w-8 hover:text-white hover:bg-gray-800 text-xl font-bold bg-gray-500 rounded-full">
                                            X
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto overflow-y-auto max-h-80">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Product Id
                                        </label>
                                        <input name="id" readOnly disabled value={newProduct?.id || ''} className="shadow cursor-not-allowed appearance-none border bg-white rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Product Title
                                        </label>
                                        <input
                                            name="title"
                                            value={newProduct?.title || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Brand
                                        </label>
                                        <input
                                            name="brand"
                                            value={newProduct?.brand || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Category
                                        </label>
                                        <input
                                            name="category"
                                            value={newProduct?.category || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={newProduct?.stock || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Product Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={newProduct?.description || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                            rows="3"
                                        ></textarea>
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Product Image Url
                                        </label>
                                        <input
                                            name="imageUrl"
                                            value={newProduct?.imageUrl || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Price
                                        </label>
                                        <input
                                            name="price"
                                            value={price || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Discount Percentage
                                        </label>
                                        <input
                                            type="number"
                                            name="discountPercentage"
                                            value={newProduct?.discountPercentage || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Discount Price
                                        </label>
                                        <input
                                            value={discountPrice || ''}
                                            onChange={handleInputChange}
                                            name="discountPrice"
                                            disabled
                                            className="bg-white shadow cursor-not-allowed appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="text-white bg-yellow-500 hover:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button" onClick={handleUpdate} >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {showAlert ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                                <div className="flex items-start space-x-2 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">Are you Sure to Delete ?</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowAlert(false)}
                                    >
                                        <span className="text-black text-center justify-center items-center flex h-8 w-8 hover:text-white hover:bg-gray-800 text-xl font-bold bg-gray-500 rounded-full">
                                            X
                                        </span>
                                    </button>
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-yellow-500 hover:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowAlert(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <div className="min-h-screen h-full bg-black flex justify-center">
                <div className="w-full max-w-4xl px-2">
                    <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none">
                        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
                            <thead className="rounded-lg text-base text-white font-semibold w-full">
                                <tr className="bg-orange-500">
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        ID
                                    </th>
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        Image
                                    </th>
                                    <th className="py-3 px-3  justify-center gap-1 text-white sm:text-base font-bold whitespace-nowrap">
                                        Company
                                    </th>
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        Product
                                    </th>
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        Category
                                    </th>
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        Quantity
                                    </th>
                                    <th className="flex items-center py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap gap-1">
                                        Price
                                    </th>
                                    <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsToShow?.map((data, index) => (
                                    <tr
                                        className={`${index % 2 == 0 ? "bg-[#112c44]" : "bg-gray-700"
                                            }`}
                                        key={index}
                                    >
                                        <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.id}
                                        </td>
                                        <td
                                            className={`py-2 px-3 min-w-4 font-normal text-base ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`/ProductImages/${data?.imageUrl}`}
                                                    alt="Product Image"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </td>
                                        <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.brand}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-base  font-normal ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.title}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-base  font-normal ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } min-w-[70px]`}
                                        >
                                            {data?.category}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-base  font-normal ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } min-w-[30px]`}
                                        >
                                            {data?.stock}
                                        </td>
                                        <td
                                            className={`py-5 px-4 text-base  font-normal ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                }`}
                                        >
                                            {"₹" + data?.price}
                                        </td>
                                        <td
                                            className={`py-10  flex justify-center items-center px-3 text-base space-x-2 font-normal ${index == 0
                                                ? "border-t-2 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                }`}
                                        >
                                            <button onClick={() => handleUpdateForm(data.id)} className="bg-green-700 hover:bg-green-900 font-bold rounded-lg p-1">Edit</button>
                                            <button onClick={() => handleAlertOnDelete(data.id)} className="bg-red-700 hover:bg-red-900 font-bold rounded-lg p-1">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                        <div className="text-lg">
                            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                            {currentPage == totalPage - 1
                                ? productState.products?.length
                                : (currentPage + 1) * rowsLimit}{" "}
                            of {productState.products?.length} entries
                        </div>
                        <div className="flex">
                            <ul
                                className="flex justify-center items-center gap-x-[10px] z-30"
                                role="navigation"
                                aria-label="Pagination"
                            >
                                <li
                                    className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                                        ? "bg-[#cccccc] text-black  pointer-events-none"
                                        : " cursor-pointer"
                                        }
`}
                                    onClick={previousPage}
                                >
                                    <FaChevronLeft />
                                </li>
                                {customPagination?.map((data, index) => (
                                    <li
                                        className={`flex items-center justify-center w-[36px] text-black rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${currentPage == index
                                            ? " border-sky-500"
                                            : "border-[#E4E4EB] "
                                            }`}
                                        onClick={() => changePage(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPage - 1
                                        ? "bg-[#cccccc] text-black pointer-events-none"
                                        : " cursor-pointer"
                                        }`}
                                    onClick={nextPage}
                                >
                                    <FaChevronRight />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default ProductTable;