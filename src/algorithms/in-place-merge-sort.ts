import { StepState } from "@/algorithms/consts";

export function* inPlaceMergeSort(
  arr: number[],
  i = 0,
  j = arr.length - 1
): Generator<StepState, StepState> {
  const middle = Math.floor((j - i) / 2) + i;

  yield {
    result: arr,
    colors: {
      [i]: "yellow",
      [middle]: "blue",
      [j]: "green",
    },
  };
  if (j <= i) return { result: arr };

  yield* inPlaceMergeSort(arr, i, middle);
  yield* inPlaceMergeSort(arr, middle + 1, j);

  yield* inPlaceMerge(arr, i, middle, j);

  return { result: arr };
}

export function* inPlaceMerge(
  arr: number[],
  i: number,
  middle: number,
  j: number
): Generator<StepState, StepState> {
  let left = i;
  let mid = middle;
  let right = middle + 1;
  if (arr[middle] <= arr[right]) {
    return {
      result: arr,
      colors: {
        [middle]: "yellow",
        [right]: "yellow",
      },
    };
  }

  while (left <= mid && right <= j) {
    if (arr[left] < arr[right]) {
      yield {
        result: arr,
        colors: {
          [left]: "yellow",
          [right]: "yellow",
        },
      };
      left++;
    } else {
      let index = right;

      while (index !== left) {
        yield {
          result: arr,
          colors: {
            [left]: "yellow",
            [right]: "blue",
            [index]: "green",
          },
        };
        const temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
        index--;
      }
      yield {
        result: arr,
        colors: {
          [left + 1]: "yellow",
          [right]: "blue",
          [index]: "yellow",
        },
      };
      // Update all the pointers
      left++;
      mid++;
      right++;
    }
  }
  return { result: arr };
}
