'use client';

import { HomeUser, ProfileUser } from '@/model/authUser';
import useSWR from 'swr';
import Button from '@/components/ui/Button';

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { username } = user;
    const { data: loggedInUser } = useSWR<HomeUser>('/api/me');
    const showButton = loggedInUser && loggedInUser.username !== username;
    const isFollowing = loggedInUser && loggedInUser.following.find((item) => item.username === username);

    const text = isFollowing ? 'Unfollow' : 'Follow';
    return <>{showButton && <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />}</>;
}
