import { useBreakpoint as _useBreakpoint } from 'use-breakpoint';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function useBreakpoint() {
  const { breakpoint } = _useBreakpoint(BREAKPOINTS, 'sm');

  return breakpoint;
}

export { useBreakpoint };
