"use client";

import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import useLogin from '../../hooks/useLogin';
import '../../styles/globals.css';

const Login = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        handleSubmit,
    } = useLogin();

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-top">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Login</h1>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Login;
