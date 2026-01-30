import { useEffect, useRef } from "react";

/**
 * Calls callback when click happens outside the attached element
 * @param {Function} callback
 */
export function useClickOutside(callback) {
  const ref = useRef(null);
  const callbackRef = useRef(callback);

  // Keep latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        callbackRef.current?.(event);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return ref;
}
