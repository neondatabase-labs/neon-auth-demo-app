"use server";

import { users } from "@/app/schema/neon_identity-schema";
import { todos } from "./schema/schema";
import { and, eq, isNull, sql } from "drizzle-orm";
import { CSSProperties } from "react";
import { fetchWithDrizzle } from "app/db";

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "16px",
    textAlign: "center" as const,
  },
  userList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "space-between",
    padding: "8px 12px",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
    gap: "4px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4px",
  },
  userEmail: {
    fontSize: "12px",
    color: "#666",
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    fontWeight: 500,
  },
  stats: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "4px 8px",
    borderRadius: "12px",
    gap: "2px",
    fontSize: "13px",
  },
  totalCount: {
    fontWeight: 600,
  },
  completeCount: {
    color: "#666",
    fontWeight: 400,
  },
  divider: {
    color: "#999",
    margin: "0 2px",
  },
} satisfies Record<string, CSSProperties>;

async function getUserStats() {
  const stats = await fetchWithDrizzle((db) =>
    db
      .select({
        email: users.email,
        name: users.name,
        complete: db.$count(
          todos,
          and(eq(todos.isComplete, true), eq(todos.ownerId, users.id)),
        ),
        total: db.$count(todos, eq(todos.ownerId, users.id)),
      })
      .from(todos)
      .innerJoin(users, eq(todos.ownerId, users.id))
      .where(isNull(users.deletedAt))
      .groupBy(users.email, users.name, users.id),
  );

  return stats;
}

export async function UsersStats() {
  const stats = await getUserStats();

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Team Progress</h3>
      <div style={styles.userList}>
        {stats.map((user) => (
          <div key={user.email} style={styles.userItem}>
            <div style={styles.userInfo}>
              <span style={styles.userEmail}>{user.email}</span>
              <div style={styles.infoRow}>
                <span style={styles.userName}>{user.name ?? "N/A"}</span>
                <div style={styles.stats}>
                  <span style={styles.completeCount}>{user.complete}</span>
                  <span style={styles.divider}>/</span>
                  <span style={styles.totalCount}>{user.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
