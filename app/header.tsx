"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useStackApp, useUser } from "@stackframe/stack";

export function Header() {
  const user = useUser();
  const app = useStackApp();

  return (
    <header className={styles.header}>
      <div>My Todo App</div>
      {user ? (
        <>
          Hello {user.primaryEmail}
          <Link href={app.urls.signOut}>Sign Out</Link>
        </>
      ) : (
        <span>
          <Link href={app.urls.signIn}>Sign In</Link> |{" "}
          <Link href={app.urls.signUp}>Sign Up</Link>
        </span>
      )}
    </header>
  );
}
