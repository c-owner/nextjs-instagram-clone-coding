'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import { PropagateLoader } from 'react-spinners';

export default function PostList() {
    const { data: posts, isLoading: loading } = useSWR<SimplePost[]>('/api/posts');
    if (loading) {
        return <PropagateLoader size={8} color="red" />;
    }
    if (typeof posts !== 'object') {
        return <div>Post가 없습니다.</div>;
    }
    return <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>;
}
