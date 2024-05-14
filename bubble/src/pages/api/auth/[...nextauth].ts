import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions ={
    // Configure one or more authentication providers
    providers: [
        // CredentialsProvider({
        //     name: "Sign in",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "email",
        //             placeholder: "example@example.com",
        //         },
        //         password: { label: "Password", type: "password"},
        //     }
        // }),

        // GithubProvider({
        //   clientId: process.env.GITHUB_ID,
        //   clientSecret: process.env.GITHUB_SECRET,
        // }),

        // ...add more providers here
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
        ),
    ],

    // callback function to call anytime with useSession?
    callbacks: {

        // whether can signin or not
        async signIn({ account, profile }) {
            let flag: Boolean = true;
            if (account?.provider === "google") {
                // console.log(`Your Vandy signin email is: {email}`);
                return profile.email_verified && profile.email.endsWith("@vanderbilt.edu")
            }
            return flag
        },
        
        async redirect({ url, baseUrl }) {
            // const message = `I will redirect you to ${url} page?`;
            // console.log(message);
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`

            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        
        // corresponding to the useSession function?
        async session({ session, user, token }) {
            console.log("Get session information")
            return session
        },
    }
}


export default NextAuth(authOptions)