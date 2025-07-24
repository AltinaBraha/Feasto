import ClientCartSection from "@/components/shop-page/CartSection";
import { getTranslations } from "next-intl/server";

export default async function ShopPage() {
  const t= await getTranslations('cart')
  return (
    <>
      <section
        className="h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/img/cart-banner.jpg')" }}
      >
        <h1 className="text-white text-5xl font-serif">{t('cart')}</h1>
      </section>

      <div className="p-6 max-w-4xl mx-auto">
        <ClientCartSection />
      </div>
    </>
  );
}

