import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface IPaginationWrapperProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function PaginationWrapper<TData>(
  props: Readonly<IPaginationWrapperProps<TData>>
) {
  const { table, children } = props;

  return (
    <div className="w-full flex items-center justify-between gap-[11.5px]">
      <Button
        type="button"
        variant="outline"
        className="h-10 gap-200 group gap-x-2"
        disabled={!table.getCanPreviousPage()}
        onClick={table.previousPage}
      >
        <ArrowLeftIcon
          size={15}
          className="text-appGrey-500 group-hover:text-appWhite"
        />
        <span className="hidden md:block">Prev</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-10 gap-200 group gap-x-2"
        disabled={!table.getCanNextPage()}
        onClick={table.nextPage}
      >
        <span className="hidden md:block">Next</span>
        <ArrowRightIcon
          size={15}
          className="text-appGrey-500 group-hover:text-appWhite"
        />
      </Button>
    </div>
  );
}
