import { ElementStates } from "../../../types/element-states";

export const randomList = (minLen: number, maxLen: number, maxValue: number) => {
  const arr: any[] = [];
  const length = Math.random() * (maxLen - minLen) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push({ value: Math.floor(Math.random() * maxValue), color: ElementStates.Default})
  }
  return arr;
};