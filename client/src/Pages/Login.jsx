import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {login} from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import {GoogleLogin} from '@react-oauth/google';
import './login.scss';

const Login = () => {
    const navigate = useNavigate();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        draggable: true,
        theme: 'dark',
    };
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {email, password} = values;
            const {data} = await axios.post(login, {
                email,
                password,
            });

            localStorage.setItem('movie-user', JSON.stringify(data.token));

            toast.success('login successfully', toastOptions);
            return navigate('/');
        } catch (err) {
            if (err.message === 'Network Error') {
                toast.error('Network Error', toastOptions);

                return;
            } else if (err.response.data.message) {
                toast.error(err.response.data.message, toastOptions);

                return;
            }
            toast.error('Something went wrong', toastOptions);
        }
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
            <div className='login'>
                <div className='login_form'>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <h1>Login Form</h1>
                        <div className='input_box'>
                            <label htmlFor='email'>
                                Email
                            </label>
                            <input type='text' className='' id='email' placeholder='Enter Email' name='email' onChange={(e) => handleChange(e)} required autoFocus />
                        </div>
                        <div className='input_box'>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input type='password' className='' id='password' placeholder='Enter Password' name='password' onChange={(e) => handleChange(e)} required />
                        </div>
                        <button type='submit' className='login_button'>
                            Login
                        </button>
                        <div className='login_google'>
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    localStorage.setItem('movie-user', JSON.stringify(credentialResponse.credential));

                                    toast.success('login successfully', toastOptions);
                                    return navigate('/');
                                }}
                                onError={() => {
                                    toast.success('login failed', toastOptions);
                                }}
                            />
                        </div>
                        ;
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
