"use client";

import React from 'react';
import Header from '../components/Header';
import CreatePostForm from '../components/CreatePostForm';
import useCreatePost from '../../hooks/useCreatePost';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
    const {
        title,
        setTitle,
        content,
        setContent,
        handleSubmit,
    } = useCreatePost();

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-top">
                <h1 className="text-3xl mb-6">Create a New Post</h1>
                <CreatePostForm
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default CreatePost;
