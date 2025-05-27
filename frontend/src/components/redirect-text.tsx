import { cn } from "@/lib/utils";
import { AppPathType } from "@/path";
import Link from "next/link";

interface IRedirectTextProps {
  className?: string;
  children: string;
  href: AppPathType;
}

export function RedirectText(props: Readonly<IRedirectTextProps>) {
  const { className, children, href } = props;

  return (
    <Link className={cn("text-primary hover:underline", className)} href={href}>
      {children}
    </Link>
  );
}
