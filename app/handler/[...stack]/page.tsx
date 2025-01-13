import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/app/stack";

export default function Handler(props: any) {
  return <StackHandler fullPage app={stackServerApp} {...props} />;
}
