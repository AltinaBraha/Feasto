import foodMenu from "@/app/menus/data/food.json";


export async function GET() {
  return Response.json(foodMenu);
}
