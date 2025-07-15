"use client";

import Head from "next/head";
import Image from "next/image";
import secrets from "@/app/data/chefsSecrets.json";

export default function ChefsSecretsPage() {
  return (
    <>
      <Head>
        <title>Our Chefs' Secrets | Feasto</title>
        <meta
          name="description"
          content="Discover our latest recipes and culinary insights from top chefs."
        />
      </Head>

      <section className="min-h-screen bg-white text-black">
        {/* HERO SECTION */}
        <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/chefs-banner.jpg')" }}
          ></div>
          <div className="relative z-10 text-center">
            <h1 className="text-white text-5xl font-bold px-6 py-4">
              Latest News
            </h1>
          </div>
        </header>

        {/* CONTENT SECTION */}
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            {secrets.map((item) => (
              <article
                key={item.id}
                className="bg-white overflow-hidden group cursor-pointer"
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
