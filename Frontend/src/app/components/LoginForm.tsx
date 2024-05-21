import React from 'react';
import Link from 'next/link';

interface LoginFormProps {
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
}) => (
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
);

export default LoginForm;
