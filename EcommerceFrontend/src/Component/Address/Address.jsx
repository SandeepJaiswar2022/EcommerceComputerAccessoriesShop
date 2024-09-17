import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, setShippingAddress } from '../../State/OrderDetails/OrderDetailsSlice';


function Address() {
    const dispatcher = useDispatch();
    const navigateTo = useNavigate();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        const currentStep = localStorage.getItem('currentStep');
        console.log("In Address : ", localStorage.getItem(`currentStep`));
        if (currentStep !== '1') {
            navigateTo('/cart');
        }
    }, [navigateTo,auth.address]);


    const formHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            firstname: data.get("firstName"),
            lastname: data.get("lastName"),
            street: data.get("street"),
            city: data.get("city"),
            state: data.get("state"),
            zip: data.get("zip"),
            mobile: data.get("mobile")
        }
        console.log(userData);
        dispatcher(setShippingAddress(userData));
        localStorage.setItem('currentStep', '2');
        dispatcher(createOrder(userData));
        navigateTo(`/preordersummary`);
    }

    //In previsous Address;
    // const deliverHereHandler= (userData)=>{
    //     localStorage.setItem('currentStep', '2');
    //     dispatcher(createOrder(userData));
    //     navigateTo(`/preordersummary`);
    // }
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List of stored Addresses  */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg custom-scrollbar h-[calc(100vh-4rem)] overflow-y-scroll">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Use Below Addresses</h2>
                <div className="space-y-4">

                    {/* Saved addresses */}
                    {auth?.user?.addresses?.length > 0 ?
                        auth?.user?.addresses?.map((address) => (<div key={address.id} className="bg-gray-700 p-4 rounded-lg flex flex-col space-y-2 shadow-md">
                            <p className="font-bold text-white">{address.firstname} {address.lastname}</p>
                            <p className="text-gray-300"><span className='font-bold text-white'>Address : </span>{address.street + `, ` + address.city + ` - ` + address.zip + `, ` + address.state}</p>
                            <p className="text-gray-300"><span className='font-bold text-white'>Mobile : </span>{address.mobile}</p>
                            <button onClick={()=>deliverHereHandler(address)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">Deliver
                                Here</button>
                        </div>)
                        )
                        : <div className='font-bold text-white bg-gray-700 rounded-md text-xl text-center p-4'>No Previous Shipping Addresses Found</div>}
                </div>
            </div>

            {/* Address Form  */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Add New Address</h2>
                <form onSubmit={formHandler}>
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
                        <label htmlFor="street" className="block text-gray-400 mb-1">Street</label>
                        <textarea
                            id="street"
                            name="street"
                            rows="4"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="city" className="block text-gray-400 mb-1">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-gray-400 mb-1">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="zip" className="block text-gray-400 mb-1">Zip Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button  */}
                    <div>
                        <button type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out w-full shadow-md">
                            Deliver Here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Address
