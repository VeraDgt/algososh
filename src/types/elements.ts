import { ElementStates } from "./element-states";

export type TArrItem = {
  value: number;
  color: ElementStates;
};

export type TStackItem = {
  value: string;
  color: ElementStates;
};

export enum buttonsNames {
  add = "add",
  remove = "remove",
  clear = "clear",

  addHead = "addHead",
  addTail = "addTail",
  removeHead = "removeHead",
  removeTail = "removeTail",
  addIndex = "addIndex",
  removeIndex = "removeIndex"
}

export interface IListItem extends TStackItem {
  up?: boolean;
  down?: boolean;
  curr?: string;
}