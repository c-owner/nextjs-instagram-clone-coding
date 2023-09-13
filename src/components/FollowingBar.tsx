'use client';

import useSWR from 'swr';
import { DetailUser } from '@/model/user';
import { PropagateLoader } from 'react-spinners';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

export default function FollowingBar() {
    const { data, isLoading, error } = useSWR<DetailUser>('/api/me');
    const users = data?.following && [...data?.following, ...data?.following, ...data?.following];

    return (
        <section>
            {isLoading ? (
                <PropagateLoader size={8} color="red" />
            ) : (
                (!users || users.length === 0) && <p>{`You don't have following`}</p>
            )}
            {users && users.length > 0 && (
                <ul className="w-full flex gap-2">
                    {users.map(({ image, username }, index) => (
                        <li key={`${username} - ${index}`}>
                            <Link className="flex flex-col items-center w-20" href={`/user/${username}`}>
                                <Avatar image={image} highlight />
                                <p className="w-full text-sm text-ellipsis overflow-hidden">{username}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
