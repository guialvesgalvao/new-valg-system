import { buttonVariants } from "@/components/ui/button";
import { OrderPath } from "./get-started-banner";
import { cn } from "@/lib/utils";

interface IOrderPathCompProps extends OrderPath {
  order: number;
  children: string;
  active?: boolean;
}

export function OrderPathComp(props: Readonly<IOrderPathCompProps>) {
  const { order, children, active } = props;

  return (
    <li
      className={cn(
        "w-full min-h-32 h-full flex flex-col gap-y-5 justify-start p-4 py-6 rounded-md shadow-md",
        active
          ? "bg-primary-foreground dark:bg-primary text-primary-foreground"
          : "bg-primary/30 dark:bg-primary/15 text-primary"
      )}
    >
      <div
        className={cn(
          "bg-primary w-6 h-6 flex items-center justify-center rounded-full",
          active
            ? "bg-primary dark:bg-primary-foreground"
            : "bg-primary-foreground dark:bg-primary/10"
        )}
      >
        <span
          className={cn(
            "text-xs font-medium",
            active
              ? "text-primary-foreground dark:text-primary"
              : "text-primary"
          )}
        >
          {order}
        </span>
      </div>

      <p
        className={cn(
          "text-sm font-medium",
          active
            ? "text-primary dark:text-primary-foreground"
            : "text-primary-foreground dark:text-primary/70"
        )}
      >
        {children}
      </p>
    </li>
  );
}
