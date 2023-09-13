import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser } from '@/service/user';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
        })
        // ...add more providers here
    ],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async signIn({ user: { id, name, image, email } }) {
            if (!email) {
                return false;
            }
            await addUser({
                id,
                name: name || '',
                image,
                email,
                username: email.split('@')[0] || ''
            });
            return true;
        },
        async session({ session }) {
            const user = session?.user;
            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split('@')[0] || ''
                };
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);
