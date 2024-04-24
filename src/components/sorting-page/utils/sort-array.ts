import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../../types/element-states";
import { TArrItem } from "../../../types/elements";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { delay } from "../../../utils/utils";

export const randomArr = (minLen: number = 3, maxLen: number = 17, maxValue: number = 100) => {
  const arr: any[] = [];
  const length = Math.random() * (maxLen - minLen) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push({ value: Math.floor(Math.random() * maxValue), color: ElementStates.Default})
  }
  return arr;
};

const swap = (arr: TArrItem[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selectionSort = async (arr: TArrItem[], dir: string, setArr: Dispatch<SetStateAction<TArrItem[]>>, setLoader: Dispatch<SetStateAction<boolean>>) => {
  setLoader(true);
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
        switch (dir) {
          case "asc":
            if(arr[j].value < arr[maxInd].value) {
              maxInd = j;
            }
          break;
          case "desc":
            if(arr[j].value > arr[maxInd].value) {
              maxInd = j;
            }
          break;
          default:
            maxInd = i;
          break;
        } 
      arr[j].color = ElementStates.Default;
      arr[i].color = ElementStates.Default;
      setArr([...arr]);
    }
      maxInd !== i && swap(arr, maxInd, i)
      arr[i].color = ElementStates.Modified;
      setArr([...arr]);
  }
  setLoader(false);
};

export const bubbleSort = async (arr: TArrItem[], dir: string, setArr: Dispatch<SetStateAction<TArrItem[]>>, setLoader: Dispatch<SetStateAction<boolean>>) => {
  setLoader(true);
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS)
      switch (dir) {
        case "asc":
          if (arr[j].value > arr[j + 1].value) {
            swap(arr, j, j + 1);
          }
          arr[j].color = ElementStates.Default;
          arr[j + 1].color = ElementStates.Modified;
          setArr([...arr]);
        break;
        case "desc":
          if (arr[j].value < arr[j + 1].value) {
            swap(arr, j, j + 1);
          }
          arr[j].color = ElementStates.Default;
          arr[j + 1].color = ElementStates.Modified;
          setArr([...arr]);
        break;
        default:
        break;
      } 
      arr[j].color = ElementStates.Default;
      arr[i].color = ElementStates.Default;
      setArr([...arr]);
    }
    arr[i].color = ElementStates.Modified;
    setArr([...arr]);
  } 
  await delay(SHORT_DELAY_IN_MS);
  arr[0].color = ElementStates.Modified;
  setArr([...arr]);
  setLoader(false);
};
