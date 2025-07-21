import ClientCartSection from "@/components/shop-page/CartSection";

export default async function ShopPage() {
  return (
    <>
      <section
        className="h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/img/cart-banner.jpg')" }}
      >
        <h1 className="text-white text-5xl font-serif">Cart</h1>
      </section>

      <div className="p-6 max-w-4xl mx-auto">
        <ClientCartSection />
      </div>
    </>
  );
}

