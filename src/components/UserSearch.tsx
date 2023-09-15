'use client';

import useSWR from 'swr';
import { useState } from 'react';

export default function UserSearch() {
    const [keyword, setKeyword] = useState('corner');
    const { data, isLoading: loading } = useSWR(`/api/search/${keyword}`);
    console.log(data);
    return (
        <>
            <div>asdf</div>
        </>
    );
}
