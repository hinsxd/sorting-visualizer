import { useEffect, useRef, useState } from "react";

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

import {
  algorithmKeys,
  AlgorithmKey,
  algorithmNames,
  ARRAY_LEN,
  MAX_VALUE,
  Mode,
} from "@/algorithms/consts";

import { useSorting } from "@/hooks/useSorting";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const [mode, setMode] = useState<Mode>(Mode.Pause);
  const { algorithmKey, setAlgorithmKey, reset, nextStep, sortState } =
    useSorting({
      onReset: () => {
        setMode(Mode.Pause);
      },
      onAlgorithmChange: () => {
        setMode(Mode.Pause);
      },
    });

  const lastCalled = useRef(0);
  const delta = useRef(50);

  const [loopStop, loopStart] = useRafLoop((time) => {
    if (time - lastCalled.current > delta.current) {
      nextStep();
      lastCalled.current = time;
    }
    if (sortState?.done) {
      setMode(Mode.Pause);
    }
  });

  useEffect(() => {
    if (mode === Mode.Pause) {
      loopStop();
      return;
    }
    loopStart();
    if (mode === Mode.Play) {
      delta.current = 60;
    } else {
      delta.current = 9;
    }
  }, [loopStop, loopStart, mode]);

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
          value={algorithmKey}
          onChange={(e) => setAlgorithmKey(e.target.value as AlgorithmKey)}
        >
          {algorithmKeys.map((key) => (
            <option key={key} value={key}>
              {algorithmNames[key]}
            </option>
          ))}
        </NativeSelect>
      </div>
      <svg
        className="svg-content"
        preserveAspectRatio="none"
        height="100%"
        width="100%"
      >
        <rect x={0} y={0} width="100%" height="100%" fill="black" />
        {result?.map((value, index) => (
          <rect
            stroke="black"
            strokeWidth={1}
            key={index}
            fill={colors?.[index] ?? "white"}
            x={`${((100 * index) / ARRAY_LEN).toFixed(3)}vw`}
            y={0}
            height={`${((value / MAX_VALUE) * 100).toFixed(3)}%`}
            width={`${(100 / ARRAY_LEN).toFixed(3)}%`}
          />
        ))}
      </svg>
    </Div100vh>
  );
};

export default Home;
