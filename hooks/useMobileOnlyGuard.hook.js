import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useIsMobile } from './useIsMobile';

function useMobileOnlyGuard(ssrIsMobile) {
  if (typeof window === 'undefined') {
    return;
  }

  const router = useRouter();

  const isMobile = useIsMobile(false);

  useEffect(() => {
    if (!isMobile) {
      router.push('/');
    }
  }, [isMobile]);
}

export { useMobileOnlyGuard };
