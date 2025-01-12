import { Mic } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-x-2 cursor-default">
      <Mic size={28} />
      <h4 className="text-xl font-bold">Valg</h4>
    </div>
  );
}
