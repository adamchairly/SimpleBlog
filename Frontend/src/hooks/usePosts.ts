import { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../services/PostService';
import { toast } from 'react-toastify';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: string;
    isEditable: boolean;
}

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchAndSetPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await fetchPosts(token);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                toast.error("Error fetching posts.");
            }
        };

        fetchAndSetPosts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await deletePost(id, token);
            setPosts(posts.filter(post => post.id !== id));
            toast.success("Post deleted successfully!");
        } catch (error) {
            toast.error("Failed deleting post.");
            console.error("Error deleting post:", error);
        }
    };

    return {
        posts,
        handleDelete,
    };
};

export default usePosts;
