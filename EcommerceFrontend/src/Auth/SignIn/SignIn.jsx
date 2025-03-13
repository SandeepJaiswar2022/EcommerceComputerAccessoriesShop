import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../State/Auth/AuthSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const [formErrors, setFormErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (auth.jwtToken)
            navigate("/shop")
    }, [auth.jwtToken])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && canSubmit) {
            dispatch(login(formData));
            setCanSubmit(false);
        }
    }, [dispatch, canSubmit, formErrors])
    const formHandler = (e) => {
        e.preventDefault();
        console.log(formData);

        //Validating the formdata

        setFormErrors(validateData(formData));
        setCanSubmit(true);
        // dispatch(login(userData));
    }

    function validateData(data) {
        const errors = {}
        if (!data.email) {
            errors.email = "Email is required!";
        }
        else if (!emailRegex.test(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.password) {
            errors.password = "Password is required!";
        }
        else if (data.password.length < 4 || data.password.length > 16) {
            errors.password = "Invalid Password";
        }
        return errors;
    }

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log("name : ", name, "   value : ", value);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <ToastContainer autoClose={1000} />
            <div className="bg-transparent border border-white rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Sign In</h2>
                <form onSubmit={formHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            onChange={handleFormData}
                            value={formData.email}
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                        <p className='text-red-700 text-sm'>{formErrors.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="password">Password</label>
                        <input
                            maxLength={20}
                            type="password"
                            id="password"
                            name='password'
                            onChange={handleFormData}
                            value={formData.password}
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                        <p className='text-red-700 text-sm'>{formErrors.password}</p>
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
