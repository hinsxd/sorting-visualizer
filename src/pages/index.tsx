import { useCallback, useEffect, useRef, useState } from "react";

import { useRafLoop } from "react-use";

import { bubbleSort } from "@/algorithms/bubble-sort";

import type { NextPage } from "next";

const ARRAY_LEN = 30;

const randomArray = (length: number) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.round(Math.random() * 1000));
  }
  return arr;
};

enum Mode {
  Pause,
  Play,
  PlayFast,
}

type StepResult = {
  result: number[];
  left: number | null;
  right: number | null;
};

const Home: NextPage = () => {
  const [mode, setMode] = useState<Mode>(Mode.Pause);
  const [sortGenerator, setSortGenerator] = useState(
    bubbleSort(randomArray(ARRAY_LEN))
  );
  const [sortState, setSortState] = useState(() => sortGenerator.next());

  const reset = () => {
    const newGenerator = bubbleSort(randomArray(ARRAY_LEN));
    const next = newGenerator.next();
    setSortGenerator(newGenerator);
    setSortState(next);
    setMode(Mode.Pause);
  };

  const delta = useRef(50);
  const [loopStop, loopStart] = useRafLoop((time) => {
    if (time - lastCalled.current > delta.current) {
      nextStep();
      lastCalled.current = time;
    }
  });

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
    if (!sortState.done) {
      const next = sortGenerator.next();
      setSortState(next);
      if (next.done) loopStop();
    }
  }, [loopStop, sortGenerator, sortState.done]);

  const { result: arr, left, right } = sortState.value;

  return (
    <div>
      <button onClick={nextStep} type="button">
        next
      </button>
      <button onClick={() => setMode(Mode.Play)} type="button">
        play
      </button>
      <button onClick={() => setMode(Mode.PlayFast)} type="button">
        fast
      </button>
      <button onClick={() => setMode(Mode.Pause)} type="button">
        pause
      </button>
      <button onClick={reset} type="button">
        reset
      </button>
      <svg className="svg-content" viewBox="0 0 1000 300" transform="">
        <rect x={0} y={0} width="100%" height="100%" stroke="black" />
        {arr?.map((value, index) => (
          <rect
            key={`${index}${value}`}
            fill={
              index === left ? "green" : index === right ? "yellow" : "white"
            }
            x={index * (1000 / arr.length)}
            y={0}
            height={(value / 1000) * 300}
            width={1000 / arr.length}
          />
        ))}
      </svg>
    </div>
  );
};

export default Home;
