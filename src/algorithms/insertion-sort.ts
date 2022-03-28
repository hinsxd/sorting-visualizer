import { StepState } from "@/algorithms/type";
import { getCompareColor } from "@/helpers/getCompareColors";

export function* insertionSort(arr: number[]): Generator<StepState, StepState> {
  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j >= 1) {
      yield {
        result: arr,
        colors: { [i]: "blue", ...getCompareColor(arr, j - 1, j) },
      };
      if (arr[j] > arr[j - 1]) {
        break;
      }

      const temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  return { result: arr };
}
