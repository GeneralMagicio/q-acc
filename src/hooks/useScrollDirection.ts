import { useState, useRef, useEffect, useCallback } from 'react';

const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;

    // Only update scroll direction if the user has scrolled more than the threshold
    if (Math.abs(scrollY - lastScrollY.current) >= threshold) {
      const direction = scrollY > lastScrollY.current ? 'down' : 'up';

      // Only update state if the direction has changed
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      lastScrollY.current = scrollY;
    }

    ticking.current = false;
  }, [scrollDirection, threshold]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(updateScrollDirection);
    }
  }, [updateScrollDirection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollDirection;
};

export default useScrollDirection;
