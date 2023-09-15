import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getUserByUsername } from '@/service/user';
import { getFollowPostsOf } from '@/service/posts';

export async function GET() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('Authentication Error', { status: 401 });
    }

    return getFollowPostsOf(user.username).then((data) => NextResponse.json(data, { status: 200 }));
}
