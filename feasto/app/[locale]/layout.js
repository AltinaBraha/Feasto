import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import ConditionalLayout from '@/components/ConditionalLayout';
import { getMessages } from 'next-intl/server'; 


export default async function LocaleLayout(props) {
  const { children, params } = props;
    const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </NextIntlClientProvider>
  );
}



