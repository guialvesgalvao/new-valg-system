import { Row, Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../../ui/table";
import { EmptyTableRow } from "./empty-table-row";
import { RowTable } from "./row-table";

interface IBodyTableProps<TData> {
  table: Table<TData>;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  emptyMessage?: string;
}

export function BodyTable<TData>(props: Readonly<IBodyTableProps<TData>>) {
  const {
    table,
    emptyMessage = "There is no data to display",
    renderSubComponent,
  } = props;

  // Se não houver linhas, exibe a mensagem de tabela vazia
  if (!table.getRowModel().rows?.length)
    return (
      <TableBody>
        <EmptyTableRow
          columnsLength={table.getAllColumns().length}
          message={emptyMessage}
        />
      </TableBody>
    );

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <RowTable<TData>
          key={row.id}
          row={row}
          renderSubComponent={renderSubComponent}
        />
      ))}

      {/* Se a tabela estiver em modo mobile, exibe a mensagem de última linha */}
      {!table.getCanNextPage() && (
        <TableRow className="table-row md:hidden">
          <TableCell
            colSpan={
              table.getRowModel()?.rows?.[0].getVisibleCells().length ?? 1
            }
          >
            <div className="w-full h-10 flex items-center justify-center">
              <p className="text-sm text-appGrey-500 font-medium">
                Last row reached. No more data to display.
              </p>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
