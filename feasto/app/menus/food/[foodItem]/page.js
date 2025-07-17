import foodData from '../../data/food.json';
import Image from "next/image";
import { notFound } from "next/navigation";

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function FoodItemPage({ params }) {
  const { foodItem } = params;
  const item = foodData.find((f) => slugify(f.name) === foodItem);

  if (!item) return notFound();

  return (
    <div className="text-black">
      {/* STATIC background image with heading */}
      <div className="relative h-[480px] w-full mb-8">
        <Image
        src="/img/shop-bg-darken.jpg"
          alt="More Food Details"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Taste the Details
          </h1>
        </div>
      </div>

   <div className="max-w-6xl mx-auto px-4 py-12 text-black">
 <div className="flex flex-col md:flex-row gap-20">
  {/* Left: Food Image with hover zoom effect */}
  <div className="md:w-1/2">
    <div className="overflow-hidden rounded-lg w-[500px] h-[450px] group">
      <Image
        src="/img/product-6.jpg"
        alt={item.name}
        width={500}
        height={350}
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
  </div>


    {/* Right: Food Details */}
    <div className="md:w-1/2 flex flex-col space-y-4">
      {/* Name */}
      <h1 className="text-4xl">{item.name}</h1>

      {/* Stars */}
      <div className="flex items-center space-x-1">
        {/* Placeholder for Star component or manually add stars */}
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
        <span className="text-gray-500 text-sm ml-2">(1 review)</span>
      </div>

      {/* Price */}
      <p className="text-2xl ">${item.price}.00</p>

      {/* Ingredients */}
      {item.ingredients && (
        <div>
          <h3 className="font-semibold mb-1">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-800">
            {item.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
            <p className="text-gray-700">{item.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="mt-4 flex items-center space-x-4">
                <label htmlFor="quantity" className="font-semibold">Quantity</label>
                <input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={1}
                min={1}
                className="w-16 border border-gray-300 rounded px-2 py-1"
                />
                <button className="bg-black text-white px-6 py-2 rounded">
                Add to cart
                </button>
            </div>

            {/* Totals */}
            <div className="border-t border-gray-300 pt-4">
                <p>Product total: <span className="font-semibold">${item.price}.00</span></p>
            
            </div>

        
            </div>
        </div>
        </div>

    </div>
  );
}
