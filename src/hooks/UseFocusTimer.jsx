import { useState, useRef, useEffect } from 'react';

export const useFocusTimer = () => {
  const focusStart = useRef(null);
  const timer = useRef(null);
  const elapsed = useRef(0);
  const [seconds, setSeconds] = useState(0);

  const handleFocus = () => {
    focusStart.current = Date.now();
    timer.current = setInterval(() => {
        const diff = Math.floor((Date.now() - focusStart.current) / 1000);
        setSeconds(diff);
    }, 1000);
  }

  const handleBlur = () => {
    clearInterval(timer.current);
    elapsed.current += seconds;
    setSeconds(0);
  }

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);
  
  return { seconds, elapsed, handleFocus, handleBlur };
}
