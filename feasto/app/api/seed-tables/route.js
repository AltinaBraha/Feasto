import { seedTables } from "@/lib/firestore/seedTables";

export async function GET(req) {
  try {
    await seedTables();
    return new Response("Tables seeded!", { status: 200 });
  } catch (err) {
    return new Response("Error seeding tables: " + err.message, {
      status: 500,
    });
  }
}
