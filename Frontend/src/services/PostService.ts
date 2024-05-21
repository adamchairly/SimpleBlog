import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPosts = async (token: string | null) => {
    const response = await axios.get(`${API_BASE_URL}/api/posts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getPost = async (id: number, token: string | null) => {
    const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const deletePost = async (id: number, token: string | null) => {
    await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const createPost = async (post: { title: string; content: string; }, token: string | null) => {
    await axios.post(
        `${API_BASE_URL}/api/posts`,
        post,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
};

export const updatePost = async (id: number, title: string, content: string, token: string | null) => {
    await axios.put(
        `${API_BASE_URL}/api/posts`,
        {id, title, content},
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
}