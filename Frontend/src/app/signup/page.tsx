"use client";

import React from 'react';
import Header from '../components/Header';
import SignupForm from '../components/SignupForm';
import useSignup from '../../hooks/useSignup';
import '../../styles/globals.css';

const Signup = () => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        handleSubmit,
    } = useSignup();

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-top">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Sign Up</h1>
                <SignupForm
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Signup;
