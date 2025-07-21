import foodData from "../../data/food.json";
import FoodDetailsClient from "@/components/FoodDetails";
import { notFound } from "next/navigation";

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export function generateStaticParams() {
  return foodData.map((item) => ({
    foodItem: slugify(item.name),
  }));
}

export default async function FoodItemPage({ params }) {
  // Await params if it's a Promise or async
  const awaitedParams = await params;
  const item = foodData.find((f) => slugify(f.name) === awaitedParams.foodItem);
  if (!item) return notFound();

  return <FoodDetailsClient item={item} />;
}



