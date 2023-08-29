import { useEffect, useState } from 'react';

function useMouseMove() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function mouseHandler(e: MouseEvent) {
    setX(e.clientX);
    setY(e.clientY);
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseHandler);
    return () => {
      window.removeEventListener('mousemove', mouseHandler);
    };
  }, []);

  return {
    x,
    y,
  };
}

export default useMouseMove;
