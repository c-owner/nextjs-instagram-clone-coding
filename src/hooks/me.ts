import { HomeUser } from '@/model/user';
import useSWR from 'swr';
import { useCallback } from 'react';

async function updateBookmark(postId: string, bookmark: boolean) {
    return fetch('/api/bookmarks', {
        method: 'PUT',
        body: JSON.stringify({ id: postId, bookmark })
    }).then((res) => res.json());
}

export default function useMe() {
    const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

    const setBookmark = useCallback(
        (postId: string, bookmark: boolean) => {
            if (!user) return;
            const { bookmarks } = user;
            const newUser = {
                ...user,
                bookmarks: bookmark ? [...bookmarks, postId] : bookmarks.filter((b) => b !== postId)
            };

            // eslint-disable-next-line consistent-return
            return mutate(updateBookmark(postId, bookmark), {
                optimisticData: newUser,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true
            });
        },
        [user, mutate]
    );
    return { user, isLoading, error, setBookmark };
}
