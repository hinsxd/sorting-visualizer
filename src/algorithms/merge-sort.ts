import { StepState } from "@/algorithms/consts";

export function* mergeSort(
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

  yield* mergeSort(arr, i, middle);
  yield* mergeSort(arr, middle + 1, j);
  yield* merge(arr, i, middle, j);

  return { result: arr };
}

export function* merge(
  arr: number[],
  i: number,
  middle: number,
  j: number
): Generator<StepState, StepState> {
  let left = i;
  let right = middle + 1;
  const sorted: number[] = [];

  // Helper function to simplify repeated yields
  function* push(index: number) {
    yield {
      result: arr,
      colors: {
        [middle]: "blue",
        [index]: "red",
      },
    };
    sorted.push(arr[index]);
  }

  while (left <= middle && right <= j) {
    if (arr[left] <= arr[right]) {
      yield* push(left);
      left++;
    } else {
      yield* push(right);
      right++;
    }
  }

  while (left <= middle) {
    yield* push(left);
    left++;
  }

  while (right <= j) {
    yield* push(right);
    right++;
  }

  for (let k = 0; k < sorted.length; k++) {
    yield {
      result: arr,
      colors: {
        [i + k]: "yellow",
      },
    };
    arr[i + k] = sorted[k];
  }
  return { result: arr };
}
