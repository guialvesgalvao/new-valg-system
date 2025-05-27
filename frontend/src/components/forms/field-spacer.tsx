import { cn } from "@/lib/utils";

interface IFieldSpacerProps {
  children: React.ReactNode;
  className?: string;
}

export function FieldSpacer(props: Readonly<IFieldSpacerProps>) {
  const { className, children } = props;

  return (
    <fieldset className={cn("w-full flex flex-col gap-y-6", className)}>
      {children}
    </fieldset>
  );
}
