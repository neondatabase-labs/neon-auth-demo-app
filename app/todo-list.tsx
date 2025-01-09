"use server";

import {
  checkOrUncheckTodoFormAction,
  deleteTodoFormAction,
  getTodos,
} from "@/app/actions";
import { CSSProperties } from "react";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  todoList: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    padding: "20px",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    margin: "8px 0",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  todoText: {
    flex: 1,
    marginRight: "10px",
    fontSize: "16px",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    gap: "6px",
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
} satisfies Record<string, CSSProperties>;

export async function TodoList() {
  const todos = await getTodos();

  if (todos === null) {
    return <div style={styles.loading}>Loading...</div>;
  }

  // Calculate the number of pending todos
  const pendingTodos = todos.filter((todo) => !todo.isComplete).length;

  return (
    <div style={styles.container}>
      <div style={styles.todoList}>
        {/* Add the pending todos count */}
        <div style={styles.pendingCount}>
          {pendingTodos} todo{pendingTodos !== 1 ? "s" : ""} remaining
        </div>
        {todos.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.isComplete ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <div style={styles.buttonGroup}>
                  <form action={checkOrUncheckTodoFormAction}>
                    <input
                      name="isComplete"
                      type="hidden"
                      value={String(todo.isComplete)}
                    />
                    <input name="id" type="hidden" value={String(todo.id)} />
                    <button style={styles.button} type="submit">
                      {todo.isComplete ? "↩️" : "✅"}
                    </button>
                  </form>
                  <form action={deleteTodoFormAction}>
                    <input name="id" type="hidden" value={String(todo.id)} />
                    <button style={styles.button} type="submit">
                      🗑️
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={styles.emptyMessage}>You don&apos;t have any todos!</div>
        )}
      </div>
    </div>
  );
}
