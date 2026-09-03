import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;

        return token;
      }

      // Existing session:
      // refresh identity and role from the database so that
      // administrative role changes take effect without requiring re-login.
      if (token.id) {
        const userId = Number(token.id);

        if (Number.isInteger(userId)) {
          const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              name: true,
              email: true,
              role: true,
            },
          });

          if (currentUser) {
            token.name = currentUser.name;
            token.email = currentUser.email;
            token.role = currentUser.role;
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
});