import React from 'react';

interface EditPostFormProps {
    title: string;
    setTitle: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
}) => (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
            </label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
            </label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="flex items-center justify-between">
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Update Post
            </button>
        </div>
    </form>
);

export default EditPostForm;
