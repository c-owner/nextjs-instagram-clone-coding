'use client';

import { ProfileUser } from '@/model/user';
import Button from '@/components/ui/Button';
import useMe from '@/hooks/me';

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { username } = user;
    const { user: loggedInUser } = useMe();
    const showButton = loggedInUser && loggedInUser.username !== username;
    const isFollowing = loggedInUser && loggedInUser.following.find((item) => item.username === username);

    const text = isFollowing ? 'Unfollow' : 'Follow';
    return <>{showButton && <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />}</>;
}
