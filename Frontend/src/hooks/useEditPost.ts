import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPost, updatePost } from '../services/PostService';
import { toast } from 'react-toastify';

const useEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams<{ id: string | string[] }>();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');

            // Ensure id is a string and convert to number
            const postId = typeof id === 'string' ? parseInt(id, 10) : NaN;

            // Check if postId is a valid number before making the API call
            if (!isNaN(postId)) {
                try {
                    const data = await getPost(postId, token);
                    setTitle(data.title);
                    setContent(data.content);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching post:", error);
                    toast.error('Failed to fetch post data');
                    setLoading(false);
                }
            } else {
                console.error("Invalid post ID:", id);
                toast.error('Invalid post ID');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Same check and conversion for the submit function
        const postId = typeof id === 'string' ? parseInt(id, 10) : NaN;

        if (!isNaN(postId)) {
            try {
                await updatePost(postId, title, content, token);
                toast.success('Post updated successfully');
                router.push('/');
            } catch (error: any) {
                if (error.response) {
                    console.error("Server responded with an error:", error.response.data);
                    toast.error('Failed to update post');
                } else {
                    console.error("Error updating post:", error);
                    toast.error('Failed to update post');
                }
            }
        } else {
            console.error("Invalid post ID on submit:", id);
            toast.error('Invalid post ID on submit');
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        loading,
        handleSubmit,
    };
};

export default useEditPost;
