import { useCallback, useEffect, useRef, useState } from "react";

import { useRafLoop } from "react-use";

import { IconButton, NativeSelect } from "@mui/material";

import {
  ArrowForwardIos,
  FastForward,
  Pause,
  PlayArrow,
  Replay,
} from "@mui/icons-material";

import Div100vh from "react-div-100vh";

import { bubbleSort } from "@/algorithms/bubble-sort";

import { insertionSort } from "@/algorithms/insertion-sort";

import { StepState } from "@/algorithms/type";

import type { NextPage } from "next";
const ARRAY_LEN = 50;
const MAX_VALUE = 5000;
const randomArray = (length: number) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.round(Math.random() * MAX_VALUE));
  }
  return arr;
};

enum Mode {
  Pause,
  Play,
  PlayFast,
}

const algorithms = {
  bubbleSort,
  insertionSort,
} as const;
const algorithmNames = {
  bubbleSort: "Bubble Sort",
  insertionSort: "Insertion Sort",
} as const;
const algorithmKeys = Object.keys(algorithms);

const Home: NextPage = () => {
  const [mode, setMode] = useState<Mode>(Mode.Pause);
  const [algorithm, setAlgorithm] =
    useState<keyof typeof algorithmNames>("bubbleSort");

  const selectedAlgorithm = algorithms[algorithm];

  const [sortGenerator, setSortGenerator] = useState(
    selectedAlgorithm(randomArray(ARRAY_LEN))
  );

  const [sortState, setSortState] =
    useState<IteratorResult<StepState, StepState>>();

  const reset = useCallback(() => {
    const newGenerator = selectedAlgorithm(randomArray(ARRAY_LEN));
    const next = newGenerator.next();
    setSortGenerator(newGenerator);
    setSortState(next);
    setMode(Mode.Pause);
  }, [selectedAlgorithm]);

  const delta = useRef(50);
  const [loopStop, loopStart] = useRafLoop((time) => {
    if (time - lastCalled.current > delta.current) {
      nextStep();
      lastCalled.current = time;
    }
  });

  useEffect(() => {
    reset();
  }, [algorithm, reset]);

  useEffect(() => {
    if (mode === Mode.Pause) {
      loopStop();
      return;
    }
    loopStart();
    if (mode === Mode.Play) {
      delta.current = 70;
    } else {
      delta.current = 15;
    }
  }, [loopStop, loopStart, mode]);

  const lastCalled = useRef(0);

  const nextStep = useCallback(() => {
    if (!sortState?.done) {
      const next = sortGenerator.next();
      setSortState(next);
      if (next.done) loopStop();
    }
  }, [loopStop, sortGenerator, sortState?.done]);

  const result = sortState?.value.result;
  const colors = sortState?.value.colors;
  return (
    <Div100vh className="body-container">
      <div className="toolbar">
        <IconButton
          color={mode === Mode.Pause ? "primary" : "default"}
          onClick={() => setMode(Mode.Pause)}
          type="button"
        >
          <Pause />
        </IconButton>
        <IconButton
          color={mode === Mode.Play ? "primary" : "default"}
          onClick={() => setMode(Mode.Play)}
          type="button"
        >
          <PlayArrow />
        </IconButton>
        <IconButton
          color={mode === Mode.PlayFast ? "primary" : "default"}
          onClick={() => setMode(Mode.PlayFast)}
          type="button"
        >
          <FastForward />
        </IconButton>
        <IconButton onClick={nextStep} type="button">
          <ArrowForwardIos />
        </IconButton>
        <IconButton onClick={reset} type="button">
          <Replay />
        </IconButton>
        <NativeSelect
          value={algorithm}
          onChange={(e) =>
            setAlgorithm(e.target.value as keyof typeof algorithmNames)
          }
        >
          {algorithmKeys.map((key) => (
            <option key={key} value={key}>
              {algorithmNames[key as keyof typeof algorithmNames]}
            </option>
          ))}
        </NativeSelect>
      </div>
      <svg className="svg-content" preserveAspectRatio="none">
        <rect x={0} y={0} width="100%" height="100%" fill="black" />
        {result?.map((value, index) => (
          <rect
            stroke="black"
            strokeWidth={1}
            key={`${index}${value}`}
            fill={colors?.[index] ?? "white"}
            x={`${(100 * index) / ARRAY_LEN}vw`}
            y={0}
            height={`${(value / MAX_VALUE) * 100}%`}
            width={`${100 / ARRAY_LEN}vw`}
          />
        ))}
      </svg>
    </Div100vh>
  );
};

export default Home;
