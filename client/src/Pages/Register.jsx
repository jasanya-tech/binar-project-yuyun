import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {register} from '../utils/APIRoutes';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import './register.scss';

const Register = () => {
    const navigate = useNavigate();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        draggable: true,
        theme: 'dark',
    };
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            try {
                const {firstName, lastName, email, password, confirmPassword} = values;
                await axios.post(register, {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                });

                navigate('/login');
            } catch (err) {
                if (err.message === 'Network Error') {
                    toast.error('Network Error', toastOptions);

                    return;
                }
                toast.error('Something went wrong', toastOptions);
            }
        }
    };

    const handleValidation = () => {
        const {password, confirmPassword} = values;

        if (password.length < 5) {
            toast.error('Password should be equal or greater than 5 characters', toastOptions);
            return false;
        } else if (password !== confirmPassword) {
            toast.error('Password and confirm password should be same', toastOptions);
            return false;
        }

        return true;
    };

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value.trim()});
    };

    useEffect(() => {
        const checkAuthenticate = async () => {
            const user = await JSON.parse(localStorage.getItem('movie-user'));
            if (user) {
                navigate('/');
            }
        };
        checkAuthenticate();
    }, []);

    return (
        <>
            <div className='register'>
                <div className='register_form'>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <h1>Register Form</h1>
                        <div className='input_box'>
                            <label htmlFor='firstname'>
                                Firstname
                            </label>
                            <input type='text' id='firstname' placeholder='Enter Firstname' name='firstName' onChange={(e) => handleChange(e)} autoFocus required />
                        </div>
                        <div className='input_box'>
                            <label htmlFor='lastName'>
                                Lastname
                            </label>
                            <input type='text' id='lastName' placeholder='Enter lastName' name='lastName' onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className='input_box'>
                            <label htmlFor='email'>
                                Email
                            </label>
                            <input type='email' id='email' placeholder='Enter Email' name='email' onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className='input_box'>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input type='password' id='password' placeholder='Enter Password' name='password' onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className='input_box'>
                            <label htmlFor='confirmPassword'>
                                Confirm Password
                            </label>
                            <input type='password' id='confirmPassword' placeholder='Enter confirmPassword' name='confirmPassword' onChange={(e) => handleChange(e)} required />
                        </div>
                        <button type='submit' className='register_button'>
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
