"use client";

import React from 'react';
import Header from './components/Header';
import PostDetail from './components/PostDetail';
import usePosts from '../hooks/usePosts';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';

const Home = () => {
    const { posts, handleDelete } = usePosts();
    const router = useRouter();

    const handleEdit = (id: number) => {
        router.push(`/edit/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Blog Posts</h1>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <li key={post.id}>
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
