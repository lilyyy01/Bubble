import {NextAuthOptions} from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"


export const authConfig: NextAuthOptions = {
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

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        // ...add more providers here
    ],
};