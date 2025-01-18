"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ActionState, TableHelper } from "@/shared/helpers/table-helper";

import { Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type ActionOption = {
  id: string;
  label: string;

  isDefault?: boolean;
};

export type ActionCallout<TData> = {
  id: string;
  type: keyof typeof ActionState;

  title: string;
  icon: React.ReactNode;

  label: string;
  options: ActionOption[];

  onTableAction?: (value: string, table: Table<TData>) => void;
};

interface IActionTableCalloutProps<TData> extends ActionCallout<TData> {
  table: Table<TData>;
}

export function ActionTableCallout<TData>(
  props: Readonly<IActionTableCalloutProps<TData>>
) {
  const { id, type, label, table, onTableAction } = props;

  function onChange(value: string) {
    if (onTableAction) {
      onTableAction(value, table);
    }
  }

  return (
    <div className="w-auto flex" id={id}>
      <div className="block md:hidden">
        <MobileAction onChange={onChange} {...props} />
      </div>

      <div className="w-fit hidden md:flex items-center gap-100">
        <p className="text-sm text-appGrey-500 font-normal text-nowrap">
          {label}
        </p>
        <DesktopAction onChange={onChange} {...props} />
      </div>
    </div>
  );
}

interface IMobileActionProps<TData> extends IActionTableCalloutProps<TData> {
  onChange: (value: string) => void;
}

function MobileAction<TData>(props: Readonly<IMobileActionProps<TData>>) {
  const { label, icon, onChange, options, table } = props;
  const [isOpen, setIsOpen] = useState(false);

  const columnFilters = table.getState().columnFilters;
  const selectedOption = columnFilters?.[0] ?? { id: "all", value: "all" };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button type="button">{icon}</button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto">
        <p className="w-full text-appGrey-500 text-left text-sm font-normal border-b border-appGrey-100 pb-150">
          {label}
        </p>

        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "w-full text-appGrey text-left text-sm font-normal border-b border-appGrey-100 py-150",
              option.id === selectedOption?.value && "font-bold"
            )}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

interface IDesktopActionProps<TData> extends IActionTableCalloutProps<TData> {
  onChange: (value: string) => void;
}

function DesktopAction<TData>(props: Readonly<IDesktopActionProps<TData>>) {
  const { onChange, options, table } = props;
  const [isOpen, setIsOpen] = useState(false);

  const columnFilters = table.getState().columnFilters;

  const selectedOption = useMemo(
    () => columnFilters?.[0] ?? { id: "all", value: "all" },
    [columnFilters]
  );

  const placeholder = useMemo(() => {
    return options.find((option) => option.id === selectedOption?.value);
  }, [options, selectedOption]);

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="text-sm text-appGrey gap-200">
        <SelectValue placeholder={placeholder?.label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className={cn(
              "w-full text-appGrey text-left text-sm font-normal border-b border-appGrey-100 py-150",
              option.id === selectedOption?.value && "font-bold"
            )}
            key={option.id}
            value={option.id}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
