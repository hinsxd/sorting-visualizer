import { StepState } from "@/algorithms/consts";

export function* selectionSort(arr: number[]): Generator<StepState, StepState> {
  const n = arr.length;
  let minIndex: number;

  for (let i = 0; i < n - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      yield {
        result: arr,
        colors: {
          [j]: "blue",
          [minIndex]: "red",
        },
      };
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return { result: arr };
}
