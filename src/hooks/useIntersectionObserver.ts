import { useState, useEffect, useRef } from 'react';

interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionOptions = {},
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsIntersecting(entry.isIntersecting);
          if (callback) {
            callback(entries, observer);
          }
        });
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [callback, options.root, options.rootMargin, options.threshold]);

  return { isIntersecting, elementRef };
};

export default useIntersectionObserver;
