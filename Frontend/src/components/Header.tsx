import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

    return (
        <nav className="bg-gray-800 p-6 mb-20">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/" className="text-white text-lg font-bold">
                        SimpleBlog
                    </Link>
                </div>
                <div>
                    {token ? (
                        <>
                            <Link href="/post" className="text-gray-300 hover:text-white mr-4">
                                Create Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white mr-4">
                                Login
                            </Link>
                            <Link href="/signup" className="text-gray-300 hover:text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
