"use client";

import { Table } from "@tanstack/react-table";
import { PaginationWrapper } from "./pagination-wrapper";
import { PageButton } from "./page-button";

import { useMediaQuery } from "@/hooks/use-media-query";
import { PaginationMobile } from "./pagination-mobile";

interface IPaginationTableProps<TData> {
  table: Table<TData>;
}

export function PaginationTable<TData>(
  props: Readonly<IPaginationTableProps<TData>>
) {
  const isTablet = useMediaQuery("(min-width: 768px)");

  const { table } = props;

  if (isTablet) {
    return (
      <PaginationWrapper<TData> table={table}>
        <div className="flex items-center justify-center gap-[11.5px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <PageButton<TData>
              key={"page-button" + index}
              table={table}
              currentIndex={0}
              index={index}
            >
              {index + 1}
            </PageButton>
          ))}
        </div>
      </PaginationWrapper>
    );
  }

  return <PaginationMobile table={table} />;
}
