import foodMenu from "@/data/food.json"


export async function GET() {
  return Response.json(foodMenu);
}
