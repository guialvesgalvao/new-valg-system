"use client";

import { Table } from "@tanstack/react-table";
import { PaginationWrapper } from "./pagination-wrapper";

import { PaginationHelper } from "@/shared/helpers/pagination-helper";
import { PageButton } from "./page-button";
import { MenuPageButton } from "./menu-page-button";
import { Ellipsis } from "lucide-react";

interface IPaginationMobileProps<TData> {
  table: Table<TData>;
}

export function PaginationMobile<TData>(
  props: Readonly<IPaginationMobileProps<TData>>
) {
  const { table } = props;

  const { getLastIndex, getPageTotal, getSidesIndexes, getCurrentIndex } =
    new PaginationHelper(table);

  const rows = table.getRowCount();
  const pageSize = table.getState().pagination.pageSize;

  const currentIndex = getCurrentIndex();
  const totalPages = getPageTotal(rows, pageSize);
  const pages = getSidesIndexes();
  const lastPage = totalPages - 1;

  return (
    <PaginationWrapper<TData> table={table}>
      <div className="flex items-center justify-center gap-[11.5px]">
        {pages.slice(0, 2).map((page) => (
          <PageButton
            currentIndex={currentIndex}
            index={page}
            table={table}
            key={page}
          >
            {page + 1}
          </PageButton>
        ))}

        <MenuPageButton table={table}>
          <Ellipsis size={5} />
        </MenuPageButton>

        {pages.slice(-1).map((page) => (
          <PageButton
            currentIndex={table.getState().pagination.pageIndex}
            index={getLastIndex()}
            table={table}
            key={page}
          >
            {lastPage + 1}
          </PageButton>
        ))}
      </div>
    </PaginationWrapper>
  );
}
