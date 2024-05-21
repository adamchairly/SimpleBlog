import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        setToken(localStorage.getItem('token'));
    }, []);

    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem('token');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account/logout`);
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    // Wait for mounting: to avoid nextjs hydration error
    if (!isMounted) {
        return null;
    }

    return (
        <nav className="bg-white dark:bg-gray-600 border-b dark:border-gray-700 shadow-sm mb-20">
            <div className="container mx-auto flex justify-between items-center p-6">
                <div>
                    <Link href="/" className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
                        SimpleBlog
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    {token ? (
                        <>
                            <Link href="/post" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300">
                                Create Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300">
                                Login
                            </Link>
                            <Link href="/signup" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden px-6">
                    {token ? (
                        <>
                            <Link href="/post" className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4 transition duration-300">
                                Create Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4 transition duration-300">
                                Login
                            </Link>
                            <Link href="/signup" className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4 transition duration-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
