type AvatarSize = 'sm' | 'md' | 'lg' | 'x-lg';

type Props = {
    image?: string | null;
    size?: AvatarSize;
    highlight?: boolean;
};
export default function Avatar({ image, size = 'lg', highlight = false }: Props) {
    return (
        <div className={getContainerStyle(size, highlight)}>
            <img
                src={image ?? '/default_profile.png'}
                alt="user profile"
                referrerPolicy="no-referrer"
                className={`bg-white object-cover rounded-full ${getImageSizeStyle(size).image}`}
            />
        </div>
    );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
    const baseStyle = 'rounded-full flex justify-center items-center';
    const highlightStyle = highlight ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' : '';
    const { container } = getImageSizeStyle(size);

    return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
    container: string;
    image: string;
};
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
    // size === 'sm' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
    switch (size) {
        case 'sm':
            return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]' };
        case 'md':
            return { container: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.2rem]' };
        case 'lg':
            return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.3rem]' };
        case 'x-lg':
            return { container: 'w-[142px] h-[142px]', image: 'w-[138px] h-[138px] p-[0.3rem]' };
        default:
            throw new Error(`Unsupported type size: ${size}`);
    }
}
