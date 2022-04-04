import { useState, useRef, useEffect, useCallback } from "react";

import { AlgorithmKey, algorithms, ARRAY_LEN } from "@/algorithms/consts";
import { randomArray } from "@/helpers/randomArray";

type UseSortingProps = {
  onReset?: () => void;
  onAlgorithmChange?: (algorithm: AlgorithmKey) => void;
};

export const useSorting = (props?: UseSortingProps) => {
  const [algorithmKey, setAlgorithmKey] = useState<AlgorithmKey>("mergeSort");

  const selectedAlgorithm = algorithms[algorithmKey];

  const [sortGenerator, setSortGenerator] = useState(
    selectedAlgorithm(randomArray(ARRAY_LEN))
  );

  const [sortState, setSortState] = useState(() => sortGenerator.next());

  const onResetRef = useRef(props?.onReset);
  onResetRef.current = props?.onReset;
  const onAlgorithmChangeRef = useRef(props?.onAlgorithmChange);
  onAlgorithmChangeRef.current = props?.onAlgorithmChange;

  useEffect(() => {
    onAlgorithmChangeRef.current?.(algorithmKey);
  }, [algorithmKey]);

  const reset = useCallback(() => {
    const newGenerator = selectedAlgorithm(randomArray(ARRAY_LEN));
    const next = newGenerator.next();
    setSortGenerator(newGenerator);
    setSortState(next);
    onResetRef.current?.();
  }, [selectedAlgorithm]);

  const nextStep = useCallback(() => {
    if (!sortState.done) {
      const next = sortGenerator.next();
      setSortState(next);
    }
  }, [sortGenerator, sortState.done]);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    reset();
  }, [algorithmKey, reset]);
  return {
    algorithmKey,
    setAlgorithmKey,
    reset,
    nextStep,
    sortState,
  };
};
