type AvatarSize = 'sm' | 'md' | 'lg';

type Props = {
    image?: string | null;
    size?: AvatarSize;
    highlight?: boolean;
};
export default function Avatar({ image, size = 'lg', highlight = false }: Props) {
    return (
        <div className={getContainerStyle(size, highlight)}>
            <img
                src={image ?? undefined}
                alt="user profile"
                referrerPolicy="no-referrer"
                className={`bg-white object-cover rounded-full ${getImageSizeStyle(size)}`}
            />
        </div>
    );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
    const baseStyle = 'rounded-full flex justify-center items-center';
    const highlightStyle = highlight ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' : '';
    const sizeStyle = getContainerSize(size);

    return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
    // size === 'sm' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
    switch (size) {
        case 'sm':
            return 'w-9 h-9';
        case 'md':
            return 'w-[42px] h-[42px]';
        case 'lg':
            return 'w-[68px] h-[68px]';
        default:
            return 'w-[68px] h-[68px]';
    }
}
function getImageSizeStyle(size: AvatarSize): string {
    switch (size) {
        case 'sm':
            return 'w-[34px] h-[34px] p-[0.1rem]';
        case 'md':
            return 'w-[42px]] h-[42px]] p-[0.2rem]';
        case 'lg':
            return 'w-16 h-16 p-[0.3rem]';
        default:
            return 'w-16 h-16 p-[0.3rem]';
    }
}
