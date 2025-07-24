import drinkMenu from "@/data/drinks.json"


export async function GET() {
  return Response.json(drinkMenu);
}
