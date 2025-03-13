import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, getAllCategories } from "../../State/Product/ProductSlice";
import { ToastContainer } from "react-toastify";


function Category() {
    // const [categories, setCategories] = useState([
    //     { id: 1, name: "Electronics" },
    //     { id: 2, name: "Books" },
    //     { id: 3, name: "Clothing" },
    //     { id: 4, name: "Home Appliances" },
    //     { id: 5, name: "Sports Equipment" },
    // ]);
    const [newCategory, setNewCategory] = useState("");
    const [categoryToDelete, setCategoryToDelete] = useState();
    const categories = useSelector(state => state.product.categories);
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();

    const handleAddCategory = () => {
        dispatch(addCategory(newCategory));
        setNewCategory("");
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    const handleDeleteCategory = (category) => {
        setShowAlert(true);
        setCategoryToDelete(category);
    };

    const handleDelete = () => {
        dispatch(deleteCategory(categoryToDelete));
        setShowAlert(false);
    }

    return (
        <>
            <ToastContainer autoClose={1000} />
            {showAlert ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                                <div className="flex items-start space-x-2 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-lg text-white font-semibold">Are you Sure? All the products associated with this category will be deleted.</h3>
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
            <div className="grid grid-cols-6 p-4 h-screen">
                {/* Sidebar (1 column) */}
                <div className="col-span-1 bg-black text-white">
                    <Sidebar />
                </div>

                {/* Main Content (5 columns) */}
                <div className="col-span-5 grid grid-cols-2 gap-6 p-6 bg-gray-900">
                    {/* Left column: scrollable list of categories */}
                    <div className="overflow-auto max-h-screen pr-4">
                        <h2 className="text-xl font-semibold mb-4 text-white">Availabe Categories</h2>
                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="flex justify-between items-center p-4 mb-4 bg-gray-800 text-white rounded-lg shadow-lg  transition-all duration-200"
                                >
                                    {/* Category Name */}
                                    <span className="flex-1 font-medium text-lg">{category?.categoryName}</span>

                                    {/* Delete Button */}
                                    <button
                                        className="text-red-600 hover:text-red-800 ml-4 transform transition-transform duration-500 hover:scale-125"
                                        onClick={() => handleDeleteCategory(category)}
                                    >
                                        <FaTrashAlt className="text-xl" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right column: form to add new category */}
                    <div className=" flex pt-12 justify-center text-white rounded-lg">
                        <div className="bg-black h-fit p-16">
                            <h2 className="text-xl  text-center font-semibold mb-4">Add New Category</h2>
                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddCategory();
                                }}
                            >
                                <label htmlFor="category" className="block text-center font-medium">
                                    Category Name
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    required
                                    className="w-full p-2 bg-white text-black rounded-lg focus:ring focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Category;
