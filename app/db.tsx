import * as schema from "app/schema/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { stackServerApp } from "@/app/stack";

export async function fetchWithDrizzle<T>(
  callback: (
    db: NeonHttpDatabase<typeof schema>,
    { userId }: { userId: string },
  ) => Promise<T>,
) {
  const user = await stackServerApp.getUser();

  if (!user || !user.id) {
    throw new Error("No userId");
  }

  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

  return callback(db, { userId: user.id });
}
