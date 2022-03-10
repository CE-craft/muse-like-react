import { useRef, useEffect } from "react";

export const usePrevious = (value = 0) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
