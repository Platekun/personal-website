import { createContext, useContext } from 'react';

import { useIsMobile } from './useIsMobile';
import { useBreakpoint } from './useBreakpoint';

const context = createContext(null);

const { Provider } = context;

function usePageProps() {
  return useContext(context);
}

function PageProvider(pageProps) {
  const { ssr, isMobileSsr, children } = pageProps;

  const isMobile = useIsMobile(isMobileSsr);

  const breakpoint = useBreakpoint();

  const isSm = breakpoint === 'sm';
  const isMd = breakpoint === 'md';
  const isLg = breakpoint === 'lg';
  const isXl = breakpoint === 'xl';
  const is2Xl = breakpoint === '2xl';

  return (
    <Provider
      value={{
        isMobile,
        breakpoint,
        breakpointHelpers: {
          isSm,
          isMd,
          isLg,
          isXl,
          is2Xl,
        },
        ssr,
      }}
    >
      {children}
    </Provider>
  );
}

function withPageProps(Component) {
  return function Page(pageProps) {
    return (
      <PageProvider {...pageProps}>
        <Component {...pageProps} />
      </PageProvider>
    );
  };
}

export { usePageProps, withPageProps };
