import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

export interface ISearchTableProps<T> {
  table: Table<T>;
  columnId: string;
  placeholder?: string;
}

export interface SearchState
  extends Omit<ISearchTableProps<unknown>, "table"> {}

export function SearchTable<T>(props: Readonly<ISearchTableProps<T>>) {
  const { table, columnId, placeholder } = props;

  return (
    <div className="w-full flex items-start">
      <Input
        placeholder={placeholder}
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        className="pr-12 hover:border-appGrey"
      />
    </div>
  );
}
