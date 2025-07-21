import drinkMenu from "@/app/menus/data/drinks.json";


export async function GET() {
  return Response.json(drinkMenu);
}
