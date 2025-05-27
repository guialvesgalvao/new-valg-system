import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

interface IPageButtonProps<TData> {
  table: Table<TData>;
  currentIndex: number;
  index: number;
  children: React.ReactNode;
}

export function PageButton<TData>(props: Readonly<IPageButtonProps<TData>>) {
  const { table, currentIndex, children, index } = props;

  function handleClick() {
    table.setPageIndex(index);
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "min-w-10 h-10 hover:bg-appGrey hover:border-appGrey",
        currentIndex === index && "bg-appGrey border-appGrey text-appWhite"
      )}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
