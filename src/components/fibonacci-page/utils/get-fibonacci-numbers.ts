export const getFibonacciNumbers = (n: number): number[] => {
  let arr = [1, 1];
    for (let i = 2; i <= n; i++) {
    const a = (typeof(arr[i - 1]) == 'number' ? arr[i - 1] : 1);
    const b = (typeof(arr[i - 2]) == 'number' ? arr[i - 2] : 1);
    arr.push(a + b);
    }
    return arr;
};