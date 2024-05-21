import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (userData: { username: string; email: string; password: string; firstName: string; lastName: string; }) => {
    await axios.post(`${API_BASE_URL}/api/account/register`, userData);
};

export const loginUser = async (credentials: { username: string; password: string; }) => {
    const response = await axios.post(`${API_BASE_URL}/api/account/login`, credentials);
    return response.data;
};
