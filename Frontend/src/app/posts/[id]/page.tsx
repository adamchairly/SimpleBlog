"use client";

import React from 'react';
import Header from '../../components/Header';
import PostDetail from '../../components/PostDetail';
import usePostDetail from '../../../hooks/usePostDetail';
import 'react-toastify/dist/ReactToastify.css';

const PostDetailPage = () => {
    const { post, loading, handleDelete, handleEdit } = usePostDetail();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Post Details</h1>
                {post && (
                    <PostDetail
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.author}
                        dateCreated={post.dateCreated}
                        isEditable={post.isEditable}
                        onDelete={() => handleDelete()}
                        onEdit={() => handleEdit()}
                    />
                )}
            </div>
        </div>
    );
};

export default PostDetailPage;
