import { ElementStates } from "../../../types/element-states";

export function reverseString(input: string): string[][] {
  const letters = input.split("");
  const steps: string[][] = [[...letters]];

  if (input.length <= 1) {
    return steps;
  }

  for (let left = 0; left < Math.floor(input.length / 2); left++) {
    const right = input.length - 1 - left;

    [letters[left], letters[right]] = [letters[right], letters[left]];

    steps.push([...letters]);
  }
  return steps;
}

export function setCircleState(index: number, curr: number, length: number): ElementStates {
  if (
    index < curr || length - index -1 < curr || length === 1 || curr === Math.floor(length / 2)
  ) {
    return ElementStates.Modified;
  }
  if (curr === index || curr === length - index - 1) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
}