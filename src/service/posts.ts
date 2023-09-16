import { client, urlFor } from '@/service/sanity';
import { SimplePost } from '@/model/post';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "likes": likes[]->username,
    "image": photo,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt,
`;
export async function getFollowPostsOf(username: string) {
    return client
        .fetch(
            `*[_type =="post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createdAt desc){
          ${simplePostProjection}
        }`
        )
        .then(mapPosts);
}

export async function getPost(id: string) {
    return client
        .fetch(
            `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        "comments": comments[]{
            comment,
            "username": author->username,
            "commentImage": author->image,
        },
        "id": _id,
        "createdAt": _createdAt,
        }
        `
        )
        .then(mapPosts);
}

export async function getPostOf(username: string) {
    return client
        .fetch(
            `
        *[_type == "post" && author->username == "${username}"] | order(_createdAt desc) {
            ${simplePostProjection}
        }`
        )
        .then(mapPosts);
}
export async function getLikedPostsOf(username: string) {
    return client
        .fetch(
            `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
        )
        .then(mapPosts);
}
export async function getSavedPostsOf(username: string) {
    return client
        .fetch(
            `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
        )
        .then(mapPosts);
}

export async function addLikedPost(postId: string, username: string) {
    return client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [{ _ref: username }])
        .commit();
}

function mapPosts(posts: SimplePost[]) {
    return posts.map((post) => ({ ...post, image: urlFor(post.image) }));
}
