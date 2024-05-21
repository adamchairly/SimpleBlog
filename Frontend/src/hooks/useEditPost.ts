import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPost, updatePost } from '../services/PostService';
import { toast } from 'react-toastify';

const useEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            try {
                const data = await getPost(id, token);
                setTitle(data.title);
                setContent(data.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                toast.error('Failed to fetch post data');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            //console.log(id.toString());
            await updatePost(id, title, content, token);
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
