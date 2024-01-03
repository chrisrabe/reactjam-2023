import { useCallback, useRef } from "react";

// The function type will accept any function and return a function of the same type
type FunctionType = (...args: any[]) => any;

const useThrottle = (func: FunctionType, limit: number): FunctionType => {
  const lastFunc = useRef<ReturnType<typeof setTimeout>>();
  const lastRan = useRef<number>();

  return useCallback(
    (...args: any[]) => {
      if (!lastRan.current) {
        func(...args);
        lastRan.current = Date.now();
      } else {
        if (lastFunc.current) {
          clearTimeout(lastFunc.current);
        }
        lastFunc.current = setTimeout(
          () => {
            if (Date.now() - lastRan.current! >= limit) {
              func(...args);
              lastRan.current = Date.now();
            }
          },
          limit - (Date.now() - lastRan.current!),
        );
      }
    },
    [func, limit],
  );
};

export default useThrottle;
