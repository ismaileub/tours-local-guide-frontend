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
    picture?: string | null;
  }
}

/* =======================
   AUTH OPTIONS
======================= */
export const authOptions: NextAuthOptions = {
  providers: [
    // ================= GOOGLE =================
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),

    // ================= CREDENTIALS =================
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

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

          const data = await res.json();

          if (!data?.data?._id) return null;

          return {
            id: data.data._id,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            accessToken: data.data.accessToken,
            picture: data.data.picture,
          };
        } catch (err) {
          console.error("Credentials login error:", err);
          return null;
        }
      },
    }),
  ],

  /* =======================
     CALLBACKS
  ======================= */
  callbacks: {
    // ---------- GOOGLE → BACKEND ----------
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                picture: user.image,
              }),
            },
          );

          const data = await res.json();

          if (!data?.data?._id) return false;

          // attach backend response
          user.id = data.data._id;
          user.role = data.data.role;
          user.accessToken = data.data.accessToken;
          user.picture = data.data.picture;
        } catch (error) {
          console.error("Google login error:", error);
          return false;
        }
      }

      return true;
    },

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
  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
};
