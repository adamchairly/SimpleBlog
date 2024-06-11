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

        if(credentialChecker([username,password]) || nameChecker([firstName, lastName])) return;

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


const credentialChecker = (inputs: string[]) => {
    for (const input of inputs) {
        if (input.length > 15 || input.length < 6) {
            toast.error("Username & password must be between 6 and 15 characters.");
            return true; 
        }
    }
    return false; 
};

const nameChecker = (inputs: string[]) => {
    for (const input of inputs) {
        if (input.length > 15 || input.length < 6) {
            toast.error("First name and last name must be between 6 and 15 characters.");
            return true; 
        }
    }
    return false; 
};

export default useSignup;
