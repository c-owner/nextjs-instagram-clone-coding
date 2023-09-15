'use client';

import useSWR from 'swr';
import { FormEvent, useState } from 'react';
import { ProfileUser } from '@/model/user';
import GridSpinner from '@/components/ui/GridSpinner';
import UserCard from '@/components/UserCard';

export default function UserSearch() {
    const [keyword, setKeyword] = useState('');
    const { data: users, isLoading: loading, error } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <section className="w-full max-w-2xl my-4 flex flex-col items-center mx-3">
            <form onSubmit={onSubmit} className="w-full mb-4">
                <input
                    type="text"
                    className="w-full text-xl p-3 outline-none border border-gray-400 rounded-lg"
                    autoFocus
                    placeholder="Search for a username or name"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <div>Failed to load</div>}
            {loading && <GridSpinner />}
            {!loading && !error && users?.length === 0 && (
                <p>
                    Nothing found for <strong>{keyword}</strong>
                </p>
            )}
            <ul className="w-full p-4">
                {users &&
                    users.map((user) => (
                        <li key={user.username}>
                            <UserCard user={user} />
                        </li>
                    ))}
            </ul>
        </section>
    );
}
