import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/AuthService';
import { toast } from 'react-toastify';

const useSignup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await registerUser({ username, email, password, firstName, lastName });
            toast.success('Registration successful');
            router.push('/login');
        } catch (error) {
            toast.error('Registration failed');
            console.error(error);
        }
    };

    return {
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
    };
};

export default useSignup;
