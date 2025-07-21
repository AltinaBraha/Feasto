export default function MenuHeader() {
  return (
    <section className="min-h-screen text-black">
      <div className="relative h-[105vh] mb-20">
        <img
          src="/img/MenusFood/menu.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
          <h2 className="text-white text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
            <span className="block w-12 border-b-2 border-white-600"></span>
            <span>delicious & healthy</span>
            <span className="block w-12 border-b-2 border-white-600"></span>
          </h2>
          <h1 className="text-white text-7xl font-serif tracking-wide font-sans">
            OUR MENU
          </h1>
          <p className="text-white text-lg uppercase tracking-wide">
            Tuesday–Sunday, 12pm–8pm
          </p>
        </div>
      </div>
    </section>
  );
}
