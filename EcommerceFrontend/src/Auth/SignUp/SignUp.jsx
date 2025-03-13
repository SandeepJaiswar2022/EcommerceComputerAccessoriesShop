import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, register } from '../../State/Auth/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    // The email couldn't start or finish with a dot

    // The email shouldn't contain spaces into the string

    // The email shouldn't contain special chars (<:, *,ecc)

    // The email could contain dots in the middle of mail address before the @

    // The email could contain a double doman('.de.org' or similar rarity)

    const [canSubmit, setCanSubmit] = useState(false);
    const [formError, setFormError] = useState({});
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const formHandler = (e) => {
        e.preventDefault();
        setFormError(validateForm(formData));
        setCanSubmit(true);
    }

    useEffect(() => {
        if (auth.error === 'Email already exists') {
            // Dispatch an action to clear the error
            dispatch(clearError());
        }
        if (auth.jwtToken) {
            navigateTo("/shop")
        }
    }, [auth.jwtToken, auth.error, dispatch])

    useEffect(() => {
        if (Object.keys(formError).length === 0 && canSubmit) {
            dispatch(register(formData));
            setCanSubmit(false);
        }
    }, [formError])

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData);
    }

    function validateForm(data) {
        const errors = {};
        if (!data.firstname) {
            errors.firstname = 'Firstname is Required';
        }
        if (!data.lastname) {
            errors.lastname = 'Lastname is Required';
        }
        if (!data.email) {
            errors.email = 'Email is Required';
        }
        else if (!emailRegex.test(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.password) {
            errors.password = 'Password is Required';
        }
        else if (data.password.length < 6) {
            errors.password = 'Password is Too Short';
        }
        else if (data.password.length > 16) {
            errors.password = 'Max password length should be 16';
        }
        else if (data.password) {
            let digit = false;
            let specialCharacter = false;
            let capitalLetter = false;
            let smallLetter = false;
            const n = data.password.length;
            const password = data.password;

            for (let i = 0; i < n; i++) {
                if (password[i] >= 'a' && password[i] <= 'z') smallLetter = true;
                else if (password[i] >= 'A' && password[i] <= 'Z') capitalLetter = true;
                else if (password[i] >= '0' && password[i] <= '9') digit = true;
                else specialCharacter = true;
            }

            if (!specialCharacter || !smallLetter || !capitalLetter || !digit) {
                errors.password = "Password should be combination of Special Characeter, Digit, Small letter and Capital letter";
            }
        }
        return errors;
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <ToastContainer autoClose={1500} />
            <div className="bg-transparent border border-white rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Sign Up</h2>

                <form onSubmit={formHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1" htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                name='firstname'
                                onChange={handleFormData}
                                value={formData.firstname}
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                            <p className='text-red-700 text-sm'>{formError.firstname}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1" htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                name='lastname'
                                onChange={handleFormData}
                                value={formData.lastname}
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                            <p className='text-red-700 text-sm'>{formError.lastname}</p>
                        </div>
                    </div>
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
                        <p className='text-red-700 text-sm'>{formError.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="password">Password</label>
                        <input

                            type="password"
                            id="password"
                            name='password'
                            onChange={handleFormData}
                            value={formData.password}
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                        <p className='text-red-700 text-sm'>{formError.password}</p>
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
