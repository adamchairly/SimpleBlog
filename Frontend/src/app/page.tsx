"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostDetail from '../components/PostDetail';
import Header from '../components/Header';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
            console.log(setPosts);
    }, []);

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Blog Posts</h1>
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="">
                            <PostDetail
                                title={post.title}
                                content={post.content}
                                author={post.author}
                                dateCreated={post.dateCreated}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
