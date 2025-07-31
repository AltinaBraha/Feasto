"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore"; 
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { getTodaysOfferCategory } from "@/utils/offerCategory";
import { isOfferTimeActive } from "@/utils/offerTime";
import Favorite from "../my-account/favorites/Favorite";

export default function MenuItemCard({ item }) {
  const addToCart = useCartStore((state) => state.addToCart); 
  const locale = useLocale();

  const t = locale !== "en" ? useTranslations("items") : null;

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const slug = slugify(item.name);

  const name = t ? t(`${slug}.name`) : item.name;

  const ingredients = t
    ? item.ingredients.map((ing) => t(`${slug}.ingredients.${ing}`))
    : item.ingredients;

  const offerCategory = getTodaysOfferCategory();
  const isOnOffer =
    item.subCategory?.toLowerCase() === offerCategory && isOfferTimeActive();
  const discountedPrice = isOnOffer ? item.price * 0.8 : item.price;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 border-b border-gray-200 pb-6 gap-4 sm:gap-0">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex-1 text-start">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}/menus/food/${slug}`}
            className="font-semibold text-lg hover:text-orange-600 transition"
          >
            {name}
          </Link>
          <Favorite
            itemId={item.id}
            itemData={{ name: item.name, image: item.image }}
          />
        </div>

        <p className="text-gray-500 text-sm">{ingredients.join(", ")}</p>
        {isOnOffer && (
          <p className="text-green-600 text-xs font-semibold mt-1">
            Limited Time Offer - 20% off until 3:00 PM
          </p>
        )}
      </div>

      <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 sm:justify-end justify-start items-start sm:min-w-[110px]">
        <div className="hidden sm:block flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap mb-2 sm:mb-0">
          {isOnOffer ? (
            <>
              <span className="line-through text-gray-400 mr-1">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-orange-600">${discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <>${item.price.toFixed(2)}</>
          )}
        </span>
        <button
          onClick={() => addToCart({ ...item, qty: 1 })}
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
          className="text-orange-600 border border-orange-600 rounded px-3 py-1 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
