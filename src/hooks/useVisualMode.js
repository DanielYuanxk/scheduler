import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function (newMode, replace = false) {
    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prev) => prev.slice(0, -1));
    }
  };
  return { mode, transition, back };
}
