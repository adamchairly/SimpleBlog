import React from 'react';
import { useRouter } from 'next/navigation';
import formatDate from '../../util/formatDate'

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
    const router = useRouter();

    const handleViewDetail = () => {
        router.push(`/posts/${id}`);
    };

    return (
        <div onClick={handleViewDetail} className="cursor-pointer p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-600 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-4">{content}</p>
            <p className="text-sm text-gray-400 mb-4">By {author} on {formatDate(dateCreated)}</p>
            {isEditable && (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(id); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
