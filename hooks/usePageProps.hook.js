import { createContext, useContext } from 'react';
import { useBodyReference } from './useBodyReference.hook';

import { useIsMobile } from './useIsMobile';

const context = createContext(null);

const { Provider } = context;

function usePageProps() {
  return useContext(context);
}

function PageProvider(pageProps) {
  const { ssr, ssrIsMobile, children } = pageProps;

  const isMobile = useIsMobile(ssrIsMobile);
  const bodyReference = useBodyReference();

  return (
    <Provider
      value={{
        ssr,
        isMobile,
        bodyReference,
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
