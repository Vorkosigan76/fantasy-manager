"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "./ResetPasswordForm";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ResetPasswordCard() {
  const t = useTranslations("Authentication");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error === "invalid_token") {
    return (
      <div className="grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black text-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Invalid Reset Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                This password reset link is invalid or has expired.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else
    return (
      <Card className="w-[400px] bg-black text-gray-100 border-0">
        <CardHeader>
          <CardTitle className="text-center">
            {t("title.reset_password")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    );
}
