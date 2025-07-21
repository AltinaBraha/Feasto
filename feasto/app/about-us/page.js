import Image from "next/image";
import Head from "next/head";
import AboutUsClientWrapper from "@/components/about-us/AboutUsClientWrapper";
import AnimatedStats from "@/components/about-us/AnimatedStats";

async function getSecrets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about-us`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function AboutUsPage() {
  const data = await getSecrets();

  return (
    <>
      <Head>
        <title>Our Chefs&apos; Secrets | Feasto</title>
        <meta
          name="description"
          content="Discover our latest recipes and culinary insights from top chefs."
        />
      </Head>

      <section className="min-h-screen text-black bg-[rgba(221,89,3,0.05)]">
        {/* HERO */}
        <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/chefs-banner.jpg')" }}
          />
          <div className="relative z-10 text-center">
            <h1 className="text-white text-5xl font-bold px-6 py-4">
              About Us
            </h1>
          </div>
        </header>
        <AboutUsClientWrapper />

        <AnimatedStats />

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            {data.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-64 relative mb-4 overflow-hidden">
                  <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="px-4 pb-6">
                  <p className="text-sm text-gray-500 mb-1">
                    {item.date} ·{" "}
                    {item.category.map((cat, i) => (
                      <span key={i} className="text-orange-600 font-medium">
                        {cat}
                        {i !== item.category.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <h3 className="text-xl font-semibold mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
