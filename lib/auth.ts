import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { bearer } from "better-auth/plugins";
import { email } from "@/actions/send-email";
// import { email } from "@/actions/send-email";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    autoSignIn: false,
  },
  plugins: [bearer()],

  // session: {
  //   strategy: "cookie",
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 5 * 60, // Cache duration in seconds
  //   },
  //   expiresIn: 60 * 60 * 24 * 7, // 7 days
  //   updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  // },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      await email({
        verification_url: url,
        email: user.email,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
