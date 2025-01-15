import { cn } from "@/lib/utils";

interface IFieldRowWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function FieldRowWrapper(props: Readonly<IFieldRowWrapperProps>) {
  const { children, className } = props;

  return (
    <div
      className={cn("flex-wrap flex items-center justify-between gap-1", className)}
    >
      {children}
    </div>
  );
}
