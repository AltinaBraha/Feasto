import chefsData from "@/data/our-chefs.json";

export async function GET() {
  return Response.json(chefsData);
}
