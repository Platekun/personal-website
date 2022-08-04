import { useMemo } from 'react';
import computeIsMobile from 'ismobilejs';

function useIsMobile(ssrValue) {
  const isMobile = useMemo(() => ssrValue || computeIsMobile().any, []);

  return isMobile;
}

export { useIsMobile };
