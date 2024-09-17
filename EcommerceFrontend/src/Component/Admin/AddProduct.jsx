import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../State/Product/ProductSlice';

function AddProduct() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const formHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const product = {
            title: data.get("title"),
            description: data.get("description"),
            price: data.get("price"),
            discountPrice: data.get("discountPrice"),
            discountPercentage: data.get("discountPercentage"),
            stock: data.get("stock"),
            brand: data.get("brand"),
            imageUrl: data.get("imageUrl"),
            category: data.get("category")
        }
        dispatch(addProduct(product));
        navigateTo(`/admin/products`);
    }

    // const formHandler2 = (e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.currentTarget);

    //     const userData = {
    //         firstname: data.get("firstName"),
    //         lastname: data.get("lastName"),
    //         email: data.get("email"),
    //         password: data.get("password")
    //     }
    //     dispatch(register(userData));
    //     navigateTo(`/`);
    // }


    return (
        <div className="min-h-screen mt-2 flex justify-center bg-black">
            <div className="bg-transparent border rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-white mb-8">Add New Product</h2>
                <form onSubmit={formHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="title">Title*</label>
                        <input
                            required
                            type="text"
                            id="title"
                            name='title'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="brand">Brand*</label>
                        <input
                            required
                            type="text"
                            id="brand"
                            name='brand'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="category">Category*</label>
                        <input
                            required
                            type="text"
                            id="category"
                            name='category'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="description">Description*</label>
                        <textarea
                            required
                            id='description'
                            name="description"
                            className="shadow bg-gray-800 border-gray-600 appearance-none border rounded w-full py-2 px-1 text-white"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="stock">Stock*</label>
                        <input
                            required
                            type="number"
                            id="stock"
                            name='stock'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="price">Price*</label>
                        <input
                            required
                            type="number"
                            id="price"
                            name='price'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="discountPercentage">Discout Percentage*</label>
                        <input
                            required
                            type="number"
                            id="discountPercentage"
                            name='discountPercentage'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="discountPrice">Discount Price</label>
                        <input
                            required
                            readOnly={false}
                            disabled={false}
                            type="number"
                            id="discountPrice"
                            name='discountPrice'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="imageUrl">Img Url*</label>
                        <input
                            required
                            type="text"
                            id="imageUrl"
                            name='imageUrl'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
