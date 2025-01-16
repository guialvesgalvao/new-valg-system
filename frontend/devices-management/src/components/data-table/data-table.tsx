"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "../ui/table";
import { HeaderTable } from "./components/header-table";
import { BodyTable } from "./components/body-table";
import { TopTableToolbar } from "./top-table-toolbar";
import { SearchState } from "./components/search-table";
import { ActionCallout } from "./components/action-table-callout";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BottomTableToolbar } from "./bottom-table-toolbar";

interface DataTableProps<TData> {
  id: string;
  className?: string;

  columns: ColumnDef<TData>[];
  data: TData[];

  searchOptions?: SearchState;
  actions?: ActionCallout<TData>[];

  defaultSorting?: SortingState;
  defaultPagination?: PaginationState;
  defaultColumnFilters?: ColumnFiltersState;

  defaultSizes?: number[];

  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
}

export function DataTable<TData>(props: Readonly<DataTableProps<TData>>) {
  const {
    id,
    className,
    searchOptions,
    columns,
    data,
    actions,
    defaultPagination = {
      pageSize: 10,
      pageIndex: 0,
    },

    defaultSorting,
    defaultColumnFilters,
    getRowCanExpand,
  } = props;

  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    defaultColumnFilters ?? []
  );

  const table = useReactTable({
    data,
    columns,
    rowCount: data.length,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      pagination,
      // columnFilters,
    },
  });

  return (
    <div
      id={id}
      className={cn("w-full h-full flex flex-col justify-between", className)}
    >
      <div className="w-full h-full flex-1 flex flex-col justify-between gap-300">
        <div className="w-full h-full flex flex-col gap-300">
          <TopTableToolbar<TData>
            id={id}
            table={table}
            searchOptions={searchOptions}
            actions={actions}
          />

          <Table className="h-full overflow-hidden" id={"table-content-" + id}>
            <HeaderTable<TData> table={table} />
            <BodyTable<TData> table={table} />
          </Table>
        </div>

        <BottomTableToolbar<TData> table={table} id={id} />
      </div>
    </div>
  );
}
