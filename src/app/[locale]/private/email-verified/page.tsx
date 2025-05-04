"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerified() {
  const [count, setCount] = useState(5);

  const t = useTranslations("Authentication");

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    if (count == 0) router.push(DEFAULT_LOGIN_REDIRECT);

    return () => {
      clearInterval(timer);
    };
  }, [router, count]);
  return (
    <div className="w-full flex justify-center">
      {t("messages.success.email_verified_redirect", {
        seconds: count,
      })}
    </div>
  );
}
