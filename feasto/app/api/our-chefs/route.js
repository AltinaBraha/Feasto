import chefsData from "@/app/data/chefs.json";

export async function GET() {
  return Response.json(chefsData);
}
