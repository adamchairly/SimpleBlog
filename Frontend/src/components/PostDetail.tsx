import React from 'react';

interface PostDetailProps {
    title: string;
    content: string;
    author: string;
    dateCreated: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content, author, dateCreated }) => {
    return (
        <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{content}</p>
            <div className="text-gray-500 text-sm">
                <span>By {author}</span> | <span>{new Date(dateCreated).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default PostDetail;
