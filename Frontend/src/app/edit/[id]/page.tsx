"use client";

import React from 'react';
import Header from '../../components/Header';
import EditPostForm from '../../components/EditPostForm';
import useEditPost from '../../../hooks/useEditPost';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
    const {
        title,
        setTitle,
        content,
        setContent,
        loading,
        handleSubmit,
    } = useEditPost();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-top">
                <h1 className="text-3xl mb-6">Edit Post</h1>
                <EditPostForm
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

export default EditPost;
