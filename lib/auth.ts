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
        html: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TaskAI</h1>
              <p style="color: #ffffff; margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Reset Your Password</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Hello ${user.name},</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">We received a request to reset your password for your TaskAI account. If you didn't make this request, you can safely ignore this email.</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">To reset your password, click the button below:</p>
              
              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 30px auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 4px; text-align: center;">
                    <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 30px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none;">Reset Password</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Or copy and paste this link into your browser:</p>
              <p style="margin: 0 0 30px; font-size: 14px; line-height: 1.5; color: #6366f1; word-break: break-all;">${url}</p>
              
              <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.5;">This password reset link will expire in 24 hours.</p>
              <p style="margin: 0; font-size: 16px; line-height: 1.5;">If you need any assistance, please contact our support team.</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f4f5; padding: 20px 40px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #71717a;">© 2023 TaskAI. All rights reserved.</p>
              <p style="margin: 0; font-size: 14px; color: #71717a;">
                <a href="{{privacyUrl}}" style="color: #6366f1; text-decoration: none;">Privacy Policy</a> • 
                <a href="{{termsUrl}}" style="color: #6366f1; text-decoration: none;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`,
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
        html: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TaskAI</h1>
              <p style="color: #ffffff; margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Verify Your Email Address</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Hello ${user?.name},</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Thank you for signing up for TaskAI! To complete your registration and start using all our features, please verify your email address.</p>
              
              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 30px auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 4px; text-align: center;">
                    <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 30px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none;">Verify Email Address</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Or copy and paste this link into your browser:</p>
              <p style="margin: 0 0 30px; font-size: 14px; line-height: 1.5; color: #6366f1; word-break: break-all;">${url}</p>
              
              <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.5;">This verification link will expire in 48 hours.</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">If you didn't create an account with us, you can safely ignore this email.</p>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #f4f4f5; border-radius: 6px;">
                <h3 style="margin: 0 0 15px; font-size: 18px; color: #4b5563;">What's next after verification?</h3>
                <ul style="margin: 0; padding: 0 0 0 20px; font-size: 15px; line-height: 1.6; color: #4b5563;">
                  <li style="margin-bottom: 8px;">Complete your profile setup</li>
                  <li style="margin-bottom: 8px;">Create your first workspace</li>
                  <li style="margin-bottom: 8px;">Explore our AI-powered task management features</li>
                  <li style="margin-bottom: 0;">Invite your team members</li>
                </ul>
              </div>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.5;">If you need any assistance, please contact our support team.</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f4f5; padding: 20px 40px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #71717a;">© 2023 TaskAI. All rights reserved.</p>
              <p style="margin: 0; font-size: 14px; color: #71717a;">
                <a href="{{privacyUrl}}" style="color: #6366f1; text-decoration: none;">Privacy Policy</a> • 
                <a href="{{termsUrl}}" style="color: #6366f1; text-decoration: none;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`,
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
