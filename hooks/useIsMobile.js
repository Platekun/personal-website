import { useEffect, useState } from 'react';
import computeIsMobile from 'ismobilejs';

function useIsMobile(ssrIsMobile) {
  if (typeof window === 'undefined') {
    return ssrIsMobile;
  }

  const [isMobile, setIsMobile] = useState(
    ssrIsMobile || computeIsMobile().any
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(computeIsMobile().any);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return isMobile;
}

export { useIsMobile };
