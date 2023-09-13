'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@/components/ui/icons/HomeIcon';
import HomeFillIcon from '@/components/ui/icons/HomeFillIcon';
import SearchIcon from '@/components/ui/icons/SearchIcon';
import SearchFillIcon from '@/components/ui/icons/SearchFillIcon';
import NewIcon from '@/components/ui/icons/NewIcon';
import NewFillIcon from '@/components/ui/icons/NewFillIcon';
import ColorButton from '@/components/ui/ColorButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from '@/components/Avatar';

const menu = [
    {
        href: '/',
        icon: <HomeIcon />,
        clickedIcon: <HomeFillIcon />
    },
    {
        href: '/search',
        icon: <SearchIcon />,
        clickedIcon: <SearchFillIcon />
    },
    {
        href: '/new',
        icon: <NewIcon />,
        clickedIcon: <NewFillIcon />
    }
];
export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;

    const pathName = usePathname();
    return (
        <div className="flex justify-between items-center p-4">
            <Link href="/">
                <h1 className="text-3xl font-bold">Instagram</h1>
            </Link>
            <nav>
                <ul className="flex gap-4 justify-center items-center px-6">
                    {menu.map(({ href, icon, clickedIcon }) => (
                        <li key={href}>
                            <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
                        </li>
                    ))}
                    {user && (
                        <li>
                            <Link href={`/user/${user.username}`}>
                                <Avatar size="sm" highlight image={user.image} />
                            </Link>
                        </li>
                    )}
                    <li>
                        {session ? (
                            <ColorButton text="Sign out" onClick={() => signOut()} />
                        ) : (
                            <ColorButton text="Sign in" onClick={() => signIn()} />
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}
