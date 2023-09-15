import { NextRequest, NextResponse } from 'next/server';
import { getLikedPostsOf, getPostOf, getSavedPostsOf } from '@/service/posts';

type Context = {
    params: {
        slug: string[]; // 중첩 라우트
    };
};
export async function GET(_: NextRequest, context: Context) {
    const { slug } = context.params;

    if (!slug || !Array.isArray(slug) || slug.length < 2) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    const [username, query] = slug;

    let request = getPostOf(username);

    if (query === 'liked') {
        request = getLikedPostsOf(username);
    } else if (query === 'saved') {
        request = getSavedPostsOf(username);
    }
    return request.then((data) => NextResponse.json(data, { status: 200 }));
}
