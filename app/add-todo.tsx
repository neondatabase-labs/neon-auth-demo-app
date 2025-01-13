"use client";

import { insertTodo } from "app/actions";
import { CSSProperties, useRef } from "react";
import { useUser } from "@stackframe/stack";

const styles = {
  form: {
    display: "flex",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
} satisfies Record<string, CSSProperties>;

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useUser();

  const onSubmit = async (formData: FormData) => {
    const newTodo = formData.get("newTodo");

    if (!newTodo) {
      throw new Error("No newTodo");
    }

    if (typeof newTodo !== "string") {
      throw new Error("The newTodo must be a string");
    }

    if (!user) {
      throw new Error("No userId");
    }

    await insertTodo({ newTodo: newTodo.toString(), userId: user.id });
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={onSubmit} style={styles.form}>
      <input
        required
        name="newTodo"
        placeholder="Enter a new todo"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Todo
      </button>
    </form>
  );
}
