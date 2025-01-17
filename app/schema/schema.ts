import { bigint, boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  ownerId: text("owner_id").notNull(),
  task: text("task").notNull(),
  isComplete: boolean("is_complete").notNull().default(false),
  insertedAt: timestamp("inserted_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
