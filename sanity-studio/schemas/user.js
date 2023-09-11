export default {
    title: 'User',
    name: 'user',
    type: 'document',
    fields: [
        {
            title: 'username', // ui 상 보는 이름
            name: 'username', // 실제 데이터에 접근, 코드 상에서의 Key 역할하는 이름
            type: 'string',
        },
        {
            title: 'Name', // 사용자의 실제 이름
            name: 'name',
            type: 'string',
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'string',
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Followers',
            name: 'followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Bookmarks',
            name: 'bookmarks',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'post'}],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'username',
        },
    },
}
