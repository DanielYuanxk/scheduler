import { useState } from "react";
//set up modes and mode history so can go back to previous mode and new
// mode when needed
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // second argument allows for replacing previous mode with current mode
  // so whe calling back() it would go back 2 places
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
