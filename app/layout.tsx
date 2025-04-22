import { StackProvider, StackTheme } from "@stackframe/neon-next";
import { stackServerApp } from "./stack";
import "@/app/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("stackServerApp", stackServerApp, "typeof stackServerApp", typeof stackServerApp);

  return (
    <html suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
