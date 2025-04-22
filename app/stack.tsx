import "server-only";

import { StackServerApp } from "@stackframe/neon-next";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  // projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  // publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  // secretServerKey: 'ssk_b6h3zppvb0s60a1rqej8z6fqcj24padm0yfg6r2xkyww8',
});