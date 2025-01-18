import { Table } from "@tanstack/react-table";

export enum ActionState {
  filter = "filter",
  sort = "sort",
}

export interface StateReturn {
  id: string;
  value: string;
}

export class TableHelper<T> {
  private readonly _table: Table<T>;

  constructor(table: Table<T>) {
    this._table = table;

    this.getActionState = this.getActionState.bind(this);
    this._getColumnsFilters = this._getColumnsFilters.bind(this);
    this._getSorting = this._getSorting.bind(this);
    this._state = this._state.bind(this);
  }

  private _state(type: ActionState): StateReturn[] {
    const helper = {
      [ActionState.filter]: this._getColumnsFilters,
      [ActionState.sort]: this._getSorting,
    };

    if (!helper[type]) {
      return [];
    }

    return helper[type]();
  }

  private _getColumnsFilters(): StateReturn[] {
    const filters = this._table.getState().columnFilters;
    return filters.map((filter) => ({
      id: filter.id,
      value: filter?.value as string,
    }));
  }

  private _getSorting(): StateReturn[] {
    const sorting = this._table.getState().sorting;
    return sorting.map((sort) => ({
      id: sort.id,
      value: sort.desc ? "desc" : "asc",
    }));
  }

  public getActionState(type: ActionState) {
    const state = this._state(type);
    return state;
  }
}
