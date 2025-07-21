export default function ChefQuote({ quote, author }) {
  if (!quote) return null;

  return (
    <section className="relative h-[280px] sm:h-[350px] md:h-[400px] w-full mb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/quote-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-4 text-center text-white">
          <p className="max-w-xl text-sm sm:text-lg md:text-2xl font-light italic leading-relaxed">
            “{quote}”
          </p>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-lg font-semibold text-orange-400">
            {author}
          </p>
        </div>
      </div>
    </section>
  );
}
