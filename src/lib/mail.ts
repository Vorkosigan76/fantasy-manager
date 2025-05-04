//import TwoFactorTokenEmail from "@/components/emails/authentication/TwoFactorTokenEmail";
import PasswordResetEmail from "@/components/emails/authentication/PasswordResetEmail";
import VerificationEmail from "@/components/emails/authentication/VerificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=/private/email-verified`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `${process.env.RESEND_EMAIL_SUBJECT} - Confirm your email`,
    react: VerificationEmail({
      email: process.env.RESEND_FROM_EMAIL!,
      link: verificationUrl,
    }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordUrl = `${process.env.BETTER_AUTH_URL}/auth/reset-password?token=${token}&callbackURL=/`;
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `${process.env.RESEND_EMAIL_SUBJECT} - Reset your password`,
    react: PasswordResetEmail({
      email: process.env.RESEND_FROM_EMAIL!,
      link: resetPasswordUrl,
    }),
  });
};
/*
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `${process.env.RESEND_EMAIL_SUBJECT} - 2 Factor Authentication`,
    react: TwoFactorTokenEmail({
      email: process.env.RESEND_FROM_EMAIL!,
      token,
    }),
  });
};
*/
