"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostDetail from '../components/PostDetail';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
    isEditable: boolean;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = (id: number) => {
        router.push(`/edit/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Blog Posts</h1>
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="">
                            <PostDetail
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                author={post.author}
                                dateCreated={post.dateCreated}
                                isEditable={post.isEditable}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
