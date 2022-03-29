import { StepState } from "@/algorithms/consts";

export function* bubbleSort(arr: number[]): Generator<StepState, StepState> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        yield {
          result: arr,
          colors: {
            [j]: "yellow",
            [j + 1]: "green",
          },
        };
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        yield {
          result: arr,
          colors: {
            [j]: "green",
            [j + 1]: "yellow",
          },
        };
      } else {
        yield {
          result: arr,
          colors: {
            [j]: "yellow",
            [j + 1]: "yellow",
          },
        };
      }
    }
  }
  return { result: arr };
}
