import { jsonb, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const neonIdentitySchema = pgSchema("neon_identity");
export const users = neonIdentitySchema.table("users_sync", {
  rawJson: jsonb("raw_json").notNull(),
  id: text().primaryKey().notNull(),
  name: text(),
  email: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
});
