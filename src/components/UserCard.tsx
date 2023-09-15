import { SearchUser } from '@/model/authUser';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

type Props = {
    user: SearchUser;
};
export default function UserCard({ user: { name, username, image, email, followers, following } }: Props) {
    return (
        <Link
            className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
            href={`/user/${username}`}
        >
            <Avatar image={image} />
            <div className="text-neutral-500">
                <p className="text-black font-bold leading-4">{username}</p>
                <p className="my-1 text-sm">{name}</p>
                <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
            </div>
        </Link>
    );
}
