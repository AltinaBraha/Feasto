import chefsData from "@/app/data/our-chefs.json";

export async function GET() {
  return Response.json(chefsData);
}
