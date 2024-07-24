import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../State/Auth/AuthSlice';

const SignUp = () => {

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const formHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            firstname: data.get("firstName"),
            lastname: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password")
        }
        dispatch(register(userData));
        navigateTo(`/`);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-transparent border border-white rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Sign Up</h2>
                <form onSubmit={formHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1" htmlFor="first-name">First Name</label>
                            <input
                                required
                                type="text"
                                id="first-name"
                                name='firstName'
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1" htmlFor="last-name">Last Name</label>
                            <input
                                required
                                type="text"
                                id="last-name"
                                name='lastName'
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name='email'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="password">Password</label>
                        <input
                            required
                            type="password"
                            id="password"
                            name='password'
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-400 hover:text-blue-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
