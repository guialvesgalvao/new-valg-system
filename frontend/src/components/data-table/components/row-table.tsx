import { Row, flexRender } from "@tanstack/react-table";
import { TableRow, TableCell } from "../../ui/table";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface IRowTableProps<TData> {
  row: Row<TData>;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
}

export function RowTable<TData>(props: Readonly<IRowTableProps<TData>>) {
  const { row, renderSubComponent } = props;

  return (
    <Fragment key={row.id}>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className={cn(
          "border-appGrey-100",
          row.getIsExpanded() && "border-b-0"
        )}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            className="text-xs font-normal text-appGrey-500 py-200"
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {row.getIsExpanded() && renderSubComponent && (
        <TableRow data-state={row.getIsSelected() && "selected"}>
          <TableCell colSpan={row.getVisibleCells().length}>
            {renderSubComponent({ row })}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
