"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    };
    fetchData();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 text-center space-y-12">
      <div className="space-y-6">
        <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
          GUESTS
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          What Our Guests Are Saying
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
          We dont just serve food — we create moments. Here is what our guests
          have to say about their experience at Feasto, from the flavors on
          their plate to the feeling they take home.
        </p>
      </div>

      <div className="relative">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="px-6">
                <p className="text-orange-500 text-3xl mb-6 leading-none">“</p>
                <p className="text-sm text-gray-700 italic mb-8 leading-relaxed">
                  {t.text}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-6 flex justify-center gap-2" />
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #d1d5db; /* gray-300 */
          border-radius: 9999px;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #f97316; /* orange-500 */
        }
      `}</style>
    </section>
  );
}
