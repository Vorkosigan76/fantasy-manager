import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/authentication/SignInForm";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SocialButtons } from "./SocialButtons";

export default async function SignInCard() {
  const t = await getTranslations("Authentication");

  return (
    <Card className="w-[400px] bg-black text-gray-100 border-0">
      <CardHeader>
        <CardTitle className="text-center">{t("title.signin")}</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <p className="text-center text-sm mt-2">
          {t("text.no-account")}{" "}
          <Link
            href="/auth/signup"
            className="text-sm text-red-800 italic hover:underline"
          >
            {t("link.register")}
          </Link>
        </p>
        <SocialButtons />
      </CardContent>
    </Card>
  );
}
