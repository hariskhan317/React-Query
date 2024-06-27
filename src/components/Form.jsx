import './post.css';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, fetchTags } from '../api/api.js';
import { useState } from 'react';

const Form = (postData) => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]); 
    const queryClient = useQueryClient();

    const { isError, isLoading, data: tagData, error: tagErrors } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });

    // Mutation
    const { mutate, isError: isPostError, isLoading: isPostLoading, error: postError } = useMutation({
        mutationFn: addPost,
        retry: 3, 
        onSuccess: () => {
            queryClient.invalidateQueries('posts'); // Invalidate and refetch 'posts' query
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedTags = Object.keys(tags).filter(tag => tags[tag]);
        const newData = { id: postData?.postData.data?.length + 1 || 1, title, tags: selectedTags };
        mutate(newData);
        setTitle('') // reset form
        setTags('');
    };

    const handleTags = (e) => {
        const { name, checked } = e.target;
        setTags(prevTags => ({
            ...prevTags,
            [name]: checked,
        }));
    };

    if (isPostLoading) {
        return <>Posts Loading...</>;
    }

    if (isPostError) {
        return <>Error updating posts: {postError.message}</>;
    }

    if (isError) {
        return <>Error loading tags: {tagErrors.message}</>;
    }

    if (isLoading) {
        return <>Tags Loading...</>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className='input'
                    placeholder='Enter Your Post...'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='tags-form'>
                    {tagData.map((tag, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                name={tag}
                                checked={tags[tag] || false}
                                onChange={handleTags}
                            />
                            <label>{tag}</label>
                        </div>
                    ))}
                </div>
                <button type='submit' className='button'>Post</button>
            </form>
        </div>
    );
};

export default Form;
