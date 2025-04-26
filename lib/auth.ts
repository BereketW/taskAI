import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { bearer } from "better-auth/plugins";
import nodemailer from "nodemailer";
// import { email } from "@/actions/send-email";

async function email(data) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "bereketsodeno7@gmail.com",
      pass: "ysep afes koyd yxoi ",
    },
  });
  const mailOptions = {
    from: "bereketsodeno7@gmail.com",
    to: data.email, // Send email to the user, not yourself
    subject: data.subject,
    html: data.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
// import { email } from "@/actions/send-email";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await email({
        email: user.email,
        subject: "Reset your password",
        html: `Click the link to reset your password: ${url}`,
      });
    },
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
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    },
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await email({
        email: user.email,
        url: url,
        subject: "Task AI - Verify your email address",
        html: `<p>Click below to verify your email:</p><a href="${url}">Verify Email</a>`,
      });
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
