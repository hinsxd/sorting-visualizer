import { StepState } from "@/algorithms/consts";

export function* quickSort(
  arr: number[],
  left: number = 0,
  right: number = arr.length - 1
): Generator<StepState, StepState> {
  if (left < right) {
    const pi = yield* partition(arr, left, right);
    yield* quickSort(arr, left, pi - 1);
    yield* quickSort(arr, pi + 1, right);
  }
  return { result: arr };
}

export function* partition(
  arr: number[],
  low: number,
  right: number
): Generator<StepState, number> {
  const pivot = arr[right];
  let lastSmallerElIdx = low - 1;

  for (let i = low; i < right; i++) {
    const current = arr[i];
    yield {
      result: arr,
      colors: {
        [right]: "blue",
        [i]: current < pivot ? "green" : "yellow",
        [lastSmallerElIdx]: "red",
      },
    };
    if (current < pivot) {
      lastSmallerElIdx++;
      const temp = arr[lastSmallerElIdx];
      arr[lastSmallerElIdx] = arr[i];
      arr[i] = temp;
    }
  }

  lastSmallerElIdx++;
  yield {
    result: arr,
    colors: {
      [lastSmallerElIdx]: "red",
      [right]: "blue",
    },
  };
  const temp = arr[lastSmallerElIdx];
  arr[lastSmallerElIdx] = arr[right];
  arr[right] = temp;
  yield {
    result: arr,
    colors: {
      [lastSmallerElIdx]: "blue",
      [right]: "red",
    },
  };
  return lastSmallerElIdx;
  // Your code here
}
