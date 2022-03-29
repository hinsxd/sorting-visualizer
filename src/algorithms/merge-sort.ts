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

  while (left <= middle && right <= j) {
    yield {
      result: arr,
      colors: {
        [middle]: "blue",
        [arr[left] <= arr[right] ? left : right]: "red",
      },
    };
    if (arr[left] <= arr[right]) {
      sorted.push(arr[left]);
      left++;
    } else {
      sorted.push(arr[right]);
      right++;
    }
  }

  while (left <= middle) {
    yield {
      result: arr,
      colors: {
        [middle]: "blue",
        [left]: "red",
      },
    };
    sorted.push(arr[left]);
    left++;
  }

  while (right <= j) {
    yield {
      result: arr,
      colors: {
        [middle]: "blue",
        [right]: "red",
      },
    };
    sorted.push(arr[right]);
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
