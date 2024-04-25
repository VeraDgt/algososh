export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const swap = <T>(arr: T[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}