import { AddTodoForm } from "app/add-todo";
import { Header } from "app/header";
import { TodoList } from "app/todo-list";

import styles from "@/app/styles/Home.module.css";
import { UsersStats } from "app/users-stats";
import { stackServerApp } from "app/stack";

export default async function Home() {
  const user = await stackServerApp.getUser();

  let content = null;
  if (user) {
    content = (
      <main className={styles.main}>
        <div className={styles.container}>
          <AddTodoForm />
          <TodoList />
        </div>
        <UsersStats />
      </main>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
}
