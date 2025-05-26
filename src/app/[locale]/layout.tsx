import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { languages } from "@/i18n/settings";
import { getMessages, getTranslations } from "next-intl/server";
import { Cardo } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const font = Cardo({
  subsets: ["latin"],
  weight: ["400"],
});

// To generate static pages for all locales
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: { locale: string } }>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} className="h-full bg-white">
      <body
        className={`h-full ${font.className} antialiased bg-black text-gray-100 `}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex h-dvh bg-[url('/images/illustrations/orkteam.jpg')] bg-cover">
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-grow">{children}</div>
            </div>
          </div>
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
