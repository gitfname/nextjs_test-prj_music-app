import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import spbase from "@/supabase";

export const AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            try {
                const { data } = await spbase.from("user").upsert({
                    "provider-account-id": user.id,
                    "first-name": user.name,
                    "last-name": "",
                    "bio": "",
                    "hide-profile-picture": false,
                    "hide-email": false
                }, {
                    onConflict: "provider-account-id",
                    ignoreDuplicates: true
                })
                .select()

                console.log(data);
            }
            catch(error) {
                console.log(error);
            }

            return true
        },

        async jwt({ token, account, profile }) {
            return token
        },

        async session({session, token, user}) {
            session.userId = token?.sub
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, AuthOptions)