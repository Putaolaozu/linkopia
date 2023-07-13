import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      if (session.user) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log("connecting to db");
        //check if a user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });
        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            id: profile?.id.toString(),
            username: profile?.name ?? profile?.login,
            image: profile?.avatar_url,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
