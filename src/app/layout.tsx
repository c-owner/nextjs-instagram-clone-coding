import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Instagram',
        template: 'Instagram | %s'
    },
    description: 'Instagram',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={sans.className}>
            <body>{children}</body>
        </html>
    );
}
