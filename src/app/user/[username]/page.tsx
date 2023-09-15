import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';
import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';

type Props = { params: { username: string } };
export default async function UserPage({ params: { username } }: Props) {
    const user = await getUserForProfile(username);

    if (!user) {
        notFound();
    }

    return (
        <>
            <UserProfile user={user} />
            <UserPosts user={user} />
        </>
    );
}
