"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTitle(response.data.title);
                setContent(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                toast.error('Failed to fetch post data');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
                { id, title, content },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success('Post updated successfully');
            router.push('/');
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                toast.error(error.response.data.title || 'Failed to update post');
            } else {
                console.error("Error updating post:", error);
                toast.error('Failed to update post');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-top">
                <h1 className="text-3xl mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default EditPost;
