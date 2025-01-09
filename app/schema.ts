import { InferSelectModel } from "drizzle-orm";
import {
  bigint,
  boolean,
  jsonb,
  pgSchema,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable(
  "todos",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedByDefaultAsIdentity(),
    userId: text("user_id")
      .notNull(),
    task: text("task").notNull(),
    isComplete: boolean("is_complete").notNull().default(false),
    insertedAt: timestamp("inserted_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
);

// Filter out the neon_identity schema in `drizzle.config.ts` in order to NOT generate the schema for it.
export const neonIdentitySchema = pgSchema("neon_identity");

export const users = neonIdentitySchema.table("users_sync", {
  rawJson: jsonb("raw_json").notNull(),
  id: text().primaryKey().notNull(),
  name: text(),
  email: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
  deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
});

export type Todo = InferSelectModel<typeof todos>;
