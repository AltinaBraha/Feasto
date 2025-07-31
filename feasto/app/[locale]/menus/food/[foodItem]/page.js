import { notFound } from "next/navigation";
import FoodDetailsClient from "@/components/food-item/FoodDetails";

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export async function generateStaticParams() {
  const foodData = (await import(`@/data/food.json`)).default;
  const locales = ["en", "de", "xk"];
  const params = [];

  foodData.forEach((item) => {
    const slug = slugify(item.name);
    locales.forEach((locale) => {
      params.push({ locale, foodItem: slug });
    });
  });

  return params;
}

export default async function FoodItemPage({ params }) {
  const { locale, foodItem } = await params;  

  const foodData = (await import(`@/data/food.json`)).default;
  const item = foodData.find((f) => slugify(f.name) === foodItem);
  if (!item) return notFound();

  let translatedItem = { ...item };

  if (locale !== "en") {
    try {
      const messages = (await import(`@/messages/${locale}/items.json`)).default;
      const slug = slugify(item.name);

      const translation = messages.items?.[slug];

      if (translation) {
        translatedItem = {
          ...translatedItem,
          name: translation.name || item.name,
          description: translation.description || item.description,
          ingredients: item.ingredients.map(
            (ing) => translation.ingredients?.[ing] || ing
          ),
        };
      }
    } catch (e) {
      console.error("Translation loading error:", e);
    }
  }

 return (
  <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
    <FoodDetailsClient item={translatedItem} />
  </div>
);
}
