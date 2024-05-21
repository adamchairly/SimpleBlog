import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/AuthService';
import { toast } from 'react-toastify';

export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = await loginUser({ username, password });
            localStorage.setItem('token', token);
            toast.success('Login successful');
            router.push('/');
        } catch (error) {
            toast.error('Login failed');
            console.error(error);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleSubmit,
    };
};

export default useLogin;
