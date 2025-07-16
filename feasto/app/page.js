import Image from 'next/image';
import ImageSlider from '@/components/home-page/ImageSlider';
import AnimateOnScroll from "@/components/home-page/AnimatedSection";
import GalleryFeature from '@/components/home-page/GalleryFeature';
import ReservationForm from '@/components/ReservationForm';

export default function HomePage() {
  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen">
          <AnimateOnScroll />
      <ImageSlider />

   <section
          className="max-w-7xl mx-auto px-6 py-40 grid md:grid-cols-2 gap-16 items-center"
  
        >
          <div >
           <h3 className="text-orange-600 uppercase tracking-widest mb-4">
  Refresh your taste buds
</h3>
<hr className="border-orange-600 border-t-2 w-16 mb-6" />

            <h1 className="text-4xl font-medium  mb-8">
              Enjoy An Exceptional Journey of Taste
            </h1>
          <p className="text-lg font-extralight mb-6 text-gray-700">
  We see our customers as invited guests to a party, and we are the hosts.
  It’s our job every day to make every important aspect of the customer
  experience a little bit better.
</p>

            <button className="bg-orange-500  text-l text-white px-4 py-2 rounded hover:bg-orange-600 transition">
              DISCOVER MORE
            </button>

            <div className="relative w-full max-w-xl h-[300px] mt-10 rounded overflow-hidden shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300">
              <Image
                src="/img/chef3.jpg"
                alt="Tasty Dish"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div
            className="relative w-[450px] h-[550px] rounded overflow-hidden shadow-lg ml-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Image
              src="/img/img.jpg"
              alt="Delicious Food"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>
        <GalleryFeature></GalleryFeature>

  <section className="max-w-7xl mx-auto px-6 py-40 grid md:grid-cols-2 gap-16 items-center">
  {/* Left side: Photos */}
   {/* Left side: Photos */}
    <div className="flex items-center">
      {/* First photo */}
    <div className="relative w-[550px] h-[600px] overflow-hidden ">
      <Image
        src="/img/5.jpg"
        alt="Photo 1"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>

    {/* Second photo overlapping the first */}
    <div
      className="relative overflow-visible  z-15 -ml-15"
      style={{ width: 800, height: 800, marginTop: -200 }}
    >
      <Image
        src="/img/sauteChef.jpg"
        alt="Photo 2"
        layout="fill" 
        style={{ objectFit: "contain", objectPosition: "center" }}
      />
    </div>



</div>



  {/* Right side: Text content */}
  <div>
    <h1 className="text-orange-600 uppercase font-bold tracking-widest mb-4">QUALITY & BALANCE</h1>
    <hr className="border-orange-600 border-t-2 w-16 mb-6" />
    <h1 className="text-4xl font-medium mb-8">OUR FOOD PHILOSOPHY</h1>
    <p className="text-lg font-extralight mb-6 text-gray-700">
      Simple and balanced. Alexander Petillo brings together flavors and specialties from Italy and beyond to create his own culinary world, full of surprising artistry.
    </p>
    <button className="bg-orange-500 text-l text-white px-4 py-2 rounded hover:bg-orange-600 transition">
      DISCOVER MORE
    </button>
  </div>
</section>


      {/* Second new section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text with headings */}
        <div>
          <h3 className="text-orange-600 uppercase  font-bold tracking-widest mb-4">RIGHT HERE WAITING</h3>
          <hr className="border-orange-600 border-t-2 w-16 mb-6" />
          <h1 className="text-4xl font-medium mb-8">VISIT OUR RESTAURANT</h1>
          <p className="text-lg font-extralight mb-6 text-gray-700">
            We see our customers as invited guests to a party, and we are the hosts. Piazza della Signoria, 1050122 . Firenze . Italy
M: booking@patiotime.com
T: +39 055 1234567
          </p>
           <button className="bg-orange-500 text-l text-white px-4 py-2 rounded hover:bg-orange-600 transition">
          GET DIRECTIONS    
          </button>
          
        </div>

        {/* Right: One or more photos */}
        <div className="flex flex-col gap-8">
          <div className="relative w-full h-[300px] rounded overflow-hidden shadow-lg">
            <Image
              src="/img/food.jpg"
              alt="Photo 3"
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
            />
          </div>
          <div className="relative w-full h-[300px] rounded overflow-hidden shadow-lg">
            <Image
              src="/img/wine.jpg"
              alt="Photo 4"
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
            />
          </div>
        </div>
      </section>
      <ReservationForm></ReservationForm>

    </main>
  );
}
