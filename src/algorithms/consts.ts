import { bubbleSort } from "@/algorithms/bubble-sort";
import { insertionSort } from "@/algorithms/insertion-sort";
import { mergeSort } from "@/algorithms/merge-sort";
export type StepState = {
  result: number[];
  colors?: Record<number, string>;
};

export const algorithms = {
  bubbleSort,
  insertionSort,
  mergeSort,
} as const;
export const algorithmNames = {
  bubbleSort: "Bubble Sort",
  insertionSort: "Insertion Sort",
  mergeSort: "Merge Sort",
} as const;
export const algorithmKeys = Object.keys(algorithms);
export type AlgorithmName = keyof typeof algorithmNames;

export const ARRAY_LEN = 50;
export const MAX_VALUE = 5000;

export enum Mode {
  Pause,
  Play,
  PlayFast,
}
