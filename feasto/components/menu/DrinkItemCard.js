"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl'; 
import Favorite from "../my-account/favorites/Favorite";
import { useCartStore } from "@/lib/stores/cartStore"; 



export default function DrinkItemCard({ item }) {
  const addToCart = useCartStore((state) => state.addToCart); 
  const locale = useLocale();
  const t = locale !== "en" ? useTranslations("drinks") : null;
  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')                   
      .replace(/[\u0300-\u036f]/g, '')    
      .replace(/\s+/g, '-');  

const slug = slugify(item.name);

const translatedName = t ? t(`${slug}.name`) : item.name;

const translatedIngredients = t 
  ? item.ingredients.map(ing => t(`${slug}.ingredients.${ing}`)) 
  : item.ingredients;


  return (
    <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
      <div className="flex-shrink-0 relative w-16 h-16">
        <Image
          src={item.image}
          alt={translatedName}
          fill
          className="rounded-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Link
            href={`/menus/Drinks/${slug}`}
            className="font-semibold text-lg hover:text-orange-600 transition"
          >
            {translatedName}
          </Link>
          <Favorite itemId={item.id} itemData={{ name: item.name, image: item.image }} />
        </div>
        <p className="text-gray-500 text-sm">
          {translatedIngredients.join(", ")}
        </p>
      </div>
      <div className="flex items-center space-x-4 min-w-[110px] justify-end">
        <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap">
          ${item.price.toFixed(2)}
        </span>
        <button
          onClick={() => addToCart({ ...item, qty: 1 })}
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
          className="ml-4 text-orange-600 border border-orange-600 rounded px-2 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
