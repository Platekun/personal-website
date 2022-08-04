import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { useBreakpoint } from 'use-breakpoint';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function useRedirectOnDesktop() {
  const router = useRouter();
  const matchMedia = useBreakpoint(BREAKPOINTS, 'desktop');

  useLayoutEffect(() => {
    if (
      matchMedia &&
      (matchMedia.breakpoint === 'xl' || matchMedia.breakpoint === '2xl')
    ) {
      router.push('/');
    }
  }, [matchMedia]);
}

export { useRedirectOnDesktop };
