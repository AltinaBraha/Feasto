import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['patiotime.loftocean.com'],
  }
};

export default withNextIntl(nextConfig);
