export type Comment = {
    comment: string;
    username: string;
    image: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
    // 리스트용 post
    comments: number;
};

export type FullPost = {
    // 상세용 post
    id: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
};
