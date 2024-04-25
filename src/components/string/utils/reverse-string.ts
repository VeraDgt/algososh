import { Dispatch, SetStateAction } from "react"
import { TArrString } from "../string"
import { DELAY_IN_MS } from "../../../constants/delays"
import { ElementStates } from "../../../types/element-states";
import { delay, swap } from "../../../utils/utils";

export const reverseString = async (arr: TArrString[], setArr: Dispatch<SetStateAction<TArrString[]>>, setLoader: Dispatch<SetStateAction<boolean>>) => {

  setLoader(true);

  const mid = Math.ceil(arr.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = arr.length -1 -i;

    if(i !== j) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);
      await delay(DELAY_IN_MS);
    }

    swap(arr, i, j);

    arr[i].color = ElementStates.Modified;
    arr[j].color = ElementStates.Modified;

    setArr([...arr]);
  }
  setLoader(false);
}