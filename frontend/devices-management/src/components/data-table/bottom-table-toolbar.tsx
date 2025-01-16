import { Table } from "@tanstack/react-table";
import { PaginationTable } from "./components/pagination/pagination-table";

interface IBottomTableToolbarProps<TData> {
  table: Table<TData>;
  id: string;
}

export function BottomTableToolbar<TData>(
  props: Readonly<IBottomTableToolbarProps<TData>>
) {
  const { id, table } = props;

  return (
    <div
      id={"bottom-table-toolbar-" + id}
      className="w-full flex items-center justify-between gap-300"
    >
      <PaginationTable table={table} />
    </div>
  );
}
