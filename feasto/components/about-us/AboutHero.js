import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[90vh]">
      <Image
        src="/img/chefs-banner.jpg"
        alt="About Us Background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start max-w-6xl mx-auto px-6">
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
          ABOUT US
        </h1>
        <p className="text-white text-sm sm:text-base max-w-xl leading-relaxed">
          At Feasto, we believe every meal should be an experience. From locally
          sourced ingredients to chef-crafted dishes, we bring people together
          through flavor, ambiance, and genuine hospitality. Whether you are
          here for a quick bite or a celebration, expect comfort, creativity,
          and unforgettable taste.
        </p>
      </div>
    </section>
  );
}
