"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaginationHelper } from "@/shared/helpers/pagination-helper";
import { Table } from "@tanstack/react-table";

import { useState } from "react";

interface IMenuPageButtonProps<TData> {
  children: React.ReactNode;
  table: Table<TData>;
}

export function MenuPageButton<TData>(
  props: Readonly<IMenuPageButtonProps<TData>>
) {
  const { children, table } = props;
  const [open, setOpen] = useState(false);

  const { getBetweenIndexes, getNextIndex, getLastIndex } =
    new PaginationHelper(table);

  const pages = getBetweenIndexes(getNextIndex() + 1, getLastIndex() - 1);

  function handleClick(index: number) {
    table.setPageIndex(index);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 hover:bg-appGrey hover:border-appGrey"
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-w-60 flex items-center flex-wrap gap-100"
      >
        {pages.map((page) => (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClick(page)}
            key={page}
          >
            {page + 1}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
