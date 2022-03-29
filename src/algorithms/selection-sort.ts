import { StepState } from "@/algorithms/consts";

export function* selectionSort(arr: number[]): Generator<StepState, StepState> {
  return { result: arr };
}
