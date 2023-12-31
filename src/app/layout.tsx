import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Instagram',
        template: 'Instagram | %s'
    },
    description: 'Instagram Photos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={sans.className}>
            <body className="flex flex-col w-full mx-auto">
                <AuthContext>
                    <header className="sticky top-0 bg-white z-10 border-b">
                        <div className="max-w-screen-xl mx-auto">
                            <Navbar />
                        </div>
                    </header>
                    <main className="w-full flex justify-center max-w-screen-xl mx-auto">
                        <SWRConfigContext>{children}</SWRConfigContext>
                    </main>
                </AuthContext>
                <div id="portal" />
            </body>
        </html>
    );
}
