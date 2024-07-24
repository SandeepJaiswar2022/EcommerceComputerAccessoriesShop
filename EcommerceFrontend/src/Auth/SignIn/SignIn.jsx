import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, login } from '../../State/Auth/AuthSlice';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);


    const formHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password")
        }

        dispatch(login(userData));

        navigate('/'); // Redirect to home page
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-transparent border border-white rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Sign In</h2>
                <form onSubmit={formHandler} className="space-y-6">
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
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to={`/signup`} className="text-blue-400 hover:text-blue-700">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
