import { z } from "zod";

const getPasswordSchema = () =>
  z
    .string({ required_error: "zod.errors.required.password" })
    .min(8, { message: "zod.errors.invalid.password_too_short" })
    .max(32, { message: "zod.errors.invalid.password_too_long" });

const getEmailSchema = () =>
  z
    .string({ required_error: "zod.errors.required.email" })
    .min(1, "zod.errors.required.email")
    .email({ message: "zod.errors.invalid.email" });

const getNameSchema = () =>
  z
    .string({ required_error: "zod.errors.required.name" })
    .min(1, "zod.errors.required.name")
    .max(20, "zod.errors.invalid.name_too_long");

// Login

export const authSchema = z.object({
  email: getEmailSchema(),
  password: getPasswordSchema(),
});

export type TAuth = z.infer<typeof authSchema>;

// Registration

export const registrationSchema = z
  .object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema(),
    confirmPassword: getPasswordSchema(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "zod.errors.invalid.password_mismatch",
    path: ["confirmPassword"],
  });

export type TRegistration = z.infer<typeof registrationSchema>;

// Forgot Password

export const forgotPasswordSchema = z.object({
  email: getEmailSchema(),
});

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

// Reset Password

export const resetPasswordSchema = z
  .object({
    password: getPasswordSchema(),
    confirmPassword: getPasswordSchema(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "zod.errors.invalid.password_mismatch",
    path: ["confirmPassword"],
  });

export type TResetPassword = z.infer<typeof resetPasswordSchema>;

// Settings

export const settingsSchema = z.object({
  name: getNameSchema(),
});

export type TSettings = z.infer<typeof settingsSchema>;
