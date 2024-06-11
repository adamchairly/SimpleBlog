import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPost, deletePost } from '../services/PostService';
import { toast } from 'react-toastify';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
    isEditable: boolean;
}

const usePostDetail = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id: rawId } = useParams<{ id: string | string[] }>();

    // I think there must be more optimal solution .. :(
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const postId = parseInt(id, 10);

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            try {
                const data = await getPost(postId, token);
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                toast.error('Failed to fetch post data');
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]); 

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await deletePost(postId, token);
            toast.success('Post deleted successfully');
            router.push('/');
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error('Failed to delete post');
        }
    };

    const handleEdit = () => {
        router.push(`/edit/${postId}`);
    };

    return {
        post,
        loading,
        handleDelete,
        handleEdit,
    };
};

export default usePostDetail;
