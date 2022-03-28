import { StepState } from "@/algorithms/type";

export function* bubbleSort(arr: number[]): Generator<StepState, StepState> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      yield { result: arr, colors: { [j]: "yellow", [j + 1]: "green" } };
    }
  }
  return { result: arr };
}
