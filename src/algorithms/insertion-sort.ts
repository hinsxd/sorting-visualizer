import { StepState } from "@/algorithms/type";

export function* insertionSort(arr: number[]): Generator<StepState, StepState> {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      yield {
        result: arr,
        colors: {
          [i]: "blue",
          [j]: "yellow",
          [j + 1]: "green",
        },
      };
      j--;
    }
    arr[j + 1] = current;
  }
  return { result: arr };
}
