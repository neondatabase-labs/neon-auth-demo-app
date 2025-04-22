import { StackHandler } from "@stackframe/neon-next";
import { stackServerApp } from "@/app/stack";

export default function Handler(props: any) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
