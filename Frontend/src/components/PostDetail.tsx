import React from 'react';

interface PostDetailProps {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
    isEditable: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ id, title, content, author, dateCreated, isEditable, onDelete, onEdit }) => {
    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-700">{content}</p>
            <p className="text-sm text-gray-500">By {author} on {new Date(dateCreated).toLocaleDateString()}</p>
            {isEditable && (
                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={() => onEdit(id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostDetail;