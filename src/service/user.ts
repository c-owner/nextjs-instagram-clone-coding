import { client } from '@/service/sanity';
import { SearchUser } from '@/model/authUser';

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

export async function getUserByUsername(username: string) {
    return client.fetch(`*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    following[]->{username,image},
    followers[]->{username,image},
    "bookmarks":bookmarks[]->_id
    }`);
}

export async function searchUsers(keyword?: string) {
    // name, username 타입 중에 keyword 단어가 포함되면 검색
    const query = keyword ? `&& (name match "*${keyword}*" || username match "*${keyword}*")` : '';
    return client
        .fetch(
            `
        *[_type == "user" ${query}] | order(_createdAt desc) {
        ...,
        "following": count(following),
        "followers": count(followers),
        }
    `
        )
        .then((users) =>
            users.map((user: SearchUser) => ({
                ...user,
                following: user.following ?? 0,
                followers: user.followers ?? 0
            }))
        );
}

export async function getUserForProfile(username: string) {
    return client
        .fetch(
            `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username == "${username}"])
    }
    `
        )
        .then((user) => ({
            ...user,
            following: user.following ?? 0,
            followers: user.followers ?? 0,
            posts: user.posts ?? 0
        }));
}
