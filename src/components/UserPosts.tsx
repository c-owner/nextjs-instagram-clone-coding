'use client';

import { ProfileUser } from '@/model/authUser';
import useSWR from 'swr';
import { useState } from 'react';

type Props = {
    user: ProfileUser;
};
export default function UserPosts({ user: { username } }: Props) {
    const [tab, setTab] = useState('saved');
    const { data: posts, isLoading, error } = useSWR(`/api/users/${username}/${tab}`);
    console.log(posts);
    return <>asdf</>;
}
