import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface ILogoProps {
  className?: string;
}

export function Logo(props: Readonly<ILogoProps>) {
  const { className } = props;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-x-2 cursor-default",
        className
      )}
    >
      <Mic size={28} />
      <h4 className="text-xl font-bold">Valg</h4>
    </div>
  );
}
