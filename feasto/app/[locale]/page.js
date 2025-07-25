import Image from "next/image";
import ImageSlider from "@/components/home-page/ImageSlider";
import AnimateOnScroll from "@/components/home-page/AnimatedSection";
import GalleryFeature from "@/components/home-page/GalleryFeature";
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <AnimateOnScroll />
      <ImageSlider />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-40 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-orange-600 uppercase tracking-widest mb-4">
            {t('refreshTasteBuds')}
          </h3>
          <hr className="border-orange-600 border-t-2 w-16 mb-6" />

          <h1 className="text-3xl md:text-4xl font-medium  mb-8">
            {t('enjoyJourney')}
          </h1>
          <p className="text-base md:text-lg font-extralight mb-6 text-gray-700">
            {t('hostsMessage')}
          </p>

          <button className="bg-orange-500  text-l text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            {t('discoverMore')}
          </button>

          <div
            className="relative w-full h-[250px] md:max-w-xl md:h-[300px] mt-10 rounded overflow-hidden shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Image
              src="/img/chef3.jpg"
              alt={t('refreshTasteBuds')} 
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div
          className="relative w-full h-[350px] md:w-[450px] md:h-[550px] rounded overflow-hidden shadow-lg md:ml-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Image
            src="/img/img.jpg"
            alt={t('enjoyJourney')}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <GalleryFeature />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-40 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-full h-[300px] md:w-[550px] md:h-[600px] overflow-hidden">
            <Image
              src="/img/5.jpg"
              alt={t('qualityBalance')}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="relative w-full h-[300px] md:w-[800px] md:h-[800px] z-15 md:-ml-15 mt-4 md:mt-[-200px]">
            <Image
              src="/img/sauteChef.jpg"
              alt={t('ourPhilosophy')}
              layout="fill"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-orange-600 uppercase font-bold tracking-widest mb-4">
            {t('qualityBalance')}
          </h1>
          <hr className="border-orange-600 border-t-2 w-16 mb-6" />
          <h1 className="text-3xl md:text-4xl font-medium mb-8">
            {t('ourPhilosophy')}
          </h1>
          <p className="text-base md:text-lg font-extralight mb-6 text-gray-700">
            {t('philosophyDesc')}
          </p>
          <button className="bg-orange-500 text-l text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            {t('discoverMore')}
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-8 items-start">
        <div className="pt-6 md:mr-12 text-left md:text-right">
          <h3 className="text-orange-600 uppercase font-bold tracking-widest mb-2">
            {t('rightHereWaiting')}
          </h3>
          <hr className="border-orange-600 border-t-2 w-16 mb-3 md:ml-90" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {t('visitRestaurant')}
          </h1>
          <p className="text-base md:text-lg font-light text-gray-700 mb-4 leading-relaxed">
            {t('hostsMessage')}
            <br />
            {t('addressLine1')}
            <br />
            <strong>{t('emailLabel')}</strong> {t('email')}
            <br />
            <strong>{t('phoneLabel')}</strong> {t('phone')}
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Rruga+B,+Prishtine"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white text-sm px-5 py-2.5 rounded hover:bg-orange-600 transition inline-block"
          >
            {t('getDirections')}
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
          <div className="relative w-full md:w-1/2 h-[250px] md:h-[450px] rounded overflow-hidden">
            <Image
              src="/img/wine.jpg"
              alt={t('qualityBalance')}
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
            />
          </div>
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[320px] rounded overflow-hidden">
            <Image
              src="/img/food.jpg"
              alt={t('ourPhilosophy')}
              fill
              style={{ objectFit: "contain" }}
              className="rounded"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
