// pages/posts/[id].tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/Header';
import PostDetail from '../../../components/PostDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
    isEditable: boolean;
}

const PostDetailPage = () => {
    const [post, setPost] = useState<Post | null>(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleDelete = async (postId: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Post deleted successfully');
            router.push('/');
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error('Failed to delete post');
        }
    };

    const handleEdit = (postId: number) => {
        router.push(`/edit/${postId}`);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Post Details</h1>
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
            </div>
        </div>
    );
};

export default PostDetailPage;
