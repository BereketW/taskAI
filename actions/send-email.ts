// import emailjs from "@emailjs/browser";

// // Initialize EmailJS once
// emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY);

// export async function email(data) {
//   try {
//     const response = await emailjs.send(
//       process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
//       process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
//       {
//         verification_url: data.verification_url,
//       },
//       process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
//     );

//     return response; // Return success response
//   } catch (error) {
//     console.error("Email sending error:", error);
//     throw error; // Re-throw for better error handling
//   }
// }

// import EmailTemplate from "@/components/email-template";
// import { renderToHTML } from "next/dist/server/render";
// import nodemailer from "nodemailer";
// import { render } from "react-dom";
import { Resend } from "resend";
const resend = new Resend("re_4ffmShNX_DunFtmzMHjcvKKanYv1qtadw");
export async function email(value) {
  try {
    resend.emails.send({
      from: "bereketsodeno7@gmail.com",
      to: "anonytempo5@gmail.com",
      subject: "TaskAI - Verify your email address",
      html: `<div><p>Verify your email address</p><a href="http://localhost:3000">Verify</a></div>`,
    });
  } catch (error) {
    console.log(error);
  }
}
