import { useState, useRef, useEffect, useCallback } from "react";

import {
  AlgorithmName,
  algorithms,
  ARRAY_LEN,
  StepState,
} from "@/algorithms/consts";
import { randomArray } from "@/helpers/randomArray";

export const useSorting = (props?: {
  onReset?: any;
  onAlgorithmChange?: any;
}) => {
  const [algorithmName, setAlgorithmName] =
    useState<AlgorithmName>("mergeSort");

  const selectedAlgorithm = algorithms[algorithmName];

  const [sortGenerator, setSortGenerator] = useState(
    selectedAlgorithm(randomArray(ARRAY_LEN))
  );

  const [sortState, setSortState] =
    useState<IteratorResult<StepState, StepState>>();

  const onResetRef = useRef(props?.onReset);
  onResetRef.current = props?.onReset;
  const onAlgorithmChangeRef = useRef(props?.onAlgorithmChange);
  onAlgorithmChangeRef.current = props?.onAlgorithmChange;

  useEffect(() => {
    onAlgorithmChangeRef.current?.(algorithmName);
  }, [algorithmName]);

  const reset = useCallback(() => {
    const newGenerator = selectedAlgorithm(randomArray(ARRAY_LEN));
    const next = newGenerator.next();
    setSortGenerator(newGenerator);
    setSortState(next);
    onResetRef.current?.();
  }, [selectedAlgorithm]);

  const nextStep = useCallback(() => {
    if (!sortState?.done) {
      const next = sortGenerator.next();
      setSortState(next);
    }
  }, [sortGenerator, sortState?.done]);

  useEffect(() => {
    reset();
  }, [algorithmName, reset]);
  return {
    algorithmName,
    setAlgorithmName,
    reset,
    nextStep,
    sortState,
  };
};
