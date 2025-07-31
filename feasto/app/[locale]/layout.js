import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import ConditionalLayout from "@/components/ConditionalLayout";
import RootProvider from "@/auth/AuthInit";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RootProvider> 
        <ConditionalLayout>{children}</ConditionalLayout>
      </RootProvider>
    </NextIntlClientProvider>
  );
}
