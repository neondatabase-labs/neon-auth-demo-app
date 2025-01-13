"use server";

import {
  checkOrUncheckTodoFormAction,
  deleteTodoFormAction,
  getTodos,
} from "app/actions";
import { CSSProperties } from "react";
import styles from "@/app/styles/TodoList.module.css";

const inlineStyles = {
  todoList: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    padding: "20px",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    margin: "12px 0",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  },
  creatorEmail: {
    width: "200px",
    fontSize: "14px",
    padding: "4px 12px",
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  ownerIcon: {
    fontSize: "14px",
  },
  todoText: {
    flex: 1,
    marginRight: "10px",
    fontSize: "16px",
    color: "#333",
    marginBottom: "4px",
  },
  ownerInfo: {
    fontSize: "14px",
    color: "#0066cc",
    marginTop: "6px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  todoContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    marginLeft: "16px",
  },
  button: {
    padding: "6px 10px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    background: "white",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "20px",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "20px",
  },
  pendingCount: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "15px",
    textAlign: "center" as const,
  },
  ownerColumn: {
    width: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "16px",
  },
  ownerIndicator: {
    fontSize: "14px",
    color: "#666",
    opacity: 0.7,
    cursor: "help",
    position: "relative" as const,
  },
  ownerEmail: {
    fontSize: "13px",
    color: "#666",
    opacity: 0.85,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  ownerLabel: {
    fontSize: "11px",
    color: "#666",
    whiteSpace: "nowrap" as const,
    marginBottom: "2px",
  },
} satisfies Record<string, CSSProperties>;

export async function TodoList() {
  const todos = await getTodos();

  if (todos === null) {
    return <div style={inlineStyles.loading}>Loading...</div>;
  }

  // Calculate the number of pending todos
  const pendingTodos = todos.filter((todo) => !todo.isComplete).length;

  return (
    <div className={styles.container}>
      <div style={inlineStyles.todoList}>
        <div style={inlineStyles.pendingCount}>
          {pendingTodos} todo{pendingTodos !== 1 ? "s" : ""} remaining
        </div>
        {todos.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <li key={todo.id} style={inlineStyles.todoItem}>
                <div style={inlineStyles.ownerColumn}>
                  <small style={inlineStyles.ownerLabel}>created by</small>
                  <span style={inlineStyles.ownerEmail}>
                    {todo.owner.email}
                  </span>
                </div>
                <div style={inlineStyles.todoContent}>
                  <span
                    style={{
                      ...inlineStyles.todoText,
                      textDecoration: todo.isComplete ? "line-through" : "none",
                    }}
                  >
                    {todo.task}
                  </span>
                </div>
                <div style={inlineStyles.buttonGroup}>
                  <form action={checkOrUncheckTodoFormAction}>
                    <input
                      name="isComplete"
                      type="hidden"
                      value={String(todo.isComplete)}
                    />
                    <input name="id" type="hidden" value={String(todo.id)} />
                    <button style={inlineStyles.button} type="submit">
                      {todo.isComplete ? "↩️" : "✅"}
                    </button>
                  </form>
                  <form action={deleteTodoFormAction}>
                    <input name="id" type="hidden" value={String(todo.id)} />
                    <button style={inlineStyles.button} type="submit">
                      🗑️
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={inlineStyles.emptyMessage}>
            You don&apos;t have any todos!
          </div>
        )}
      </div>
    </div>
  );
}
