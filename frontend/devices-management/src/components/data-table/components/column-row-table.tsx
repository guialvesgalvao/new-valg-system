import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableRow } from "../../ui/table";

interface IColumnTableProps<TData> {
  headerGroup: HeaderGroup<TData>;
}

export function ColumnRowTable<TData>(
  props: Readonly<IColumnTableProps<TData>>
) {
  const { headerGroup } = props;

  return (
    <TableRow className="border-appGrey-100" key={headerGroup.id}>
      {headerGroup.headers.map((header) => {
        const isPlaceholder = header.isPlaceholder;

        return (
          <TableHead
            className="text-xs font-normal text-appGrey-500 hidden sm:table-cell"
            key={header.id}
          >
            {isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  );
}
