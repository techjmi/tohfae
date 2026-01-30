//this is a custom hook which will be used to handle the intersection observer
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (callback, options) => {
  const [element, setElement] = useState(null);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry);
        setEntry(entry);
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [element, options, callback]);

  return [setElement, entry];
};
