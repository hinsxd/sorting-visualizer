import { bubbleSort } from "@/algorithms/bubble-sort";
import { inPlaceMergeSort } from "@/algorithms/in-place-merge-sort";
import { insertionSort } from "@/algorithms/insertion-sort";
import { mergeSort } from "@/algorithms/merge-sort";
import { quickSort } from "@/algorithms/quick-sort";
export type StepState = {
  result: number[];
  colors?: Record<number, string>;
};

export const algorithms = {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  inPlaceMergeSort,
} as const;
export const algorithmNames = {
  bubbleSort: "Bubble Sort",
  insertionSort: "Insertion Sort",
  mergeSort: "Merge Sort",
  quickSort: "Quick Sort",
  inPlaceMergeSort: "In-Place Merge Sort",
} as const;
export const algorithmKeys = Object.keys(algorithms);
export type AlgorithmName = keyof typeof algorithmNames;

export const ARRAY_LEN = 700;
export const MAX_VALUE = 5000;

export enum Mode {
  Pause,
  Play,
  PlayFast,
}
