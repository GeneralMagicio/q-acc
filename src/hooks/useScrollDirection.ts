import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ticking, setTicking] = useState(false);

  const updateScrollDirection = () => {
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY) {
      setScrollDirection('down');
    } else if (scrollY < lastScrollY) {
      setScrollDirection('up');
    }
    setLastScrollY(scrollY);
    setTicking(false); // Allow the next frame update
  };

  const handleScroll = () => {
    if (!ticking) {
      setTicking(true);
      requestAnimationFrame(updateScrollDirection); // Use requestAnimationFrame for smooth updates
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, ticking]);

  return scrollDirection;
};

export default useScrollDirection;
