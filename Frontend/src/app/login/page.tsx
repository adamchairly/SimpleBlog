// pages/login.tsx
"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account/login`, { username, password });
            localStorage.setItem('token', response.data);
            toast.success('Login successful');
            router.push('/');
        } catch (error) {
            toast.error('Login failed');
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justifytop">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Login</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <Link href="/signup" legacyBehavior>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                Sign Up
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
