import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                console.log(credentials);
            }
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };