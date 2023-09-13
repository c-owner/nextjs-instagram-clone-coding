import { client } from '@/service/sanity';

type OAuthUser = {
    id: string;
    email: string | null;
    name: string | null;
    username: string | null;
    image?: string | null;
};

export async function addUser({ id, username, name, email, image }: OAuthUser) {
    return client.createIfNotExists({
        _id: id,
        _type: 'user',
        username,
        email,
        name,
        image,
        following: [],
        followers: [],
        bookmarks: []
    });
}
