import { TableHeader } from "../../ui/table";
import { Table } from "@tanstack/react-table";
import { ColumnRowTable } from "./column-row-table";

interface IHeaderTableProps<TData> {
  table: Table<TData>;
}

export function HeaderTable<TData>(props: Readonly<IHeaderTableProps<TData>>) {
  const { table } = props;

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <ColumnRowTable<TData> key={headerGroup.id} headerGroup={headerGroup} />
      ))}
    </TableHeader>
  );
}
