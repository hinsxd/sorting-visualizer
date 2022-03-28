import { StepState } from "@/algorithms/type";
import { getCompareColor } from "@/helpers/getCompareColors";

export function* bubbleSort(arr: number[]): Generator<StepState, StepState> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { result: arr, colors: getCompareColor(arr, j, j + 1) };
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return { result: arr };
}
