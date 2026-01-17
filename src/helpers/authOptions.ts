/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

/* =======================
   NEXT-AUTH TYPE AUGMENT
======================= */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      accessToken?: string | null;
      picture?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    accessToken?: string | null;
    picture?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null;
    accessToken?: string | null;
    image?: string | null;
  }
}

/* =======================
   AUTH OPTIONS
======================= */
export const authOptions: NextAuthOptions = {
  providers: [
    // ---------- GOOGLE LOGIN ----------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ---------- CREDENTIALS LOGIN ----------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!res.ok) return null;

          const user = await res.json();
          //console.log("in auth", user);

          if (!user?.data?._id) return null;

          return {
            id: user.data._id,
            name: user.data.name,
            email: user.data.email,
            role: user.data.role,
            accessToken: user.data.accessToken,
            picture: user.data.picture,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  /* =======================
     CALLBACKS
  ======================= */
  callbacks: {
    // ---------- JWT ----------
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.picture = user.picture;
      }
      return token;
    },

    // ---------- SESSION ----------
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        session.user.picture = token.picture as string;
      }
      return session;
    },
  },

  /* =======================
     CONFIG
  ======================= */
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
