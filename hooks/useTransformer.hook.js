import { useMemo } from 'react';

function useTransformer(props, transformer) {
  return useMemo(() => transformer(props), []);
}

export { useTransformer };
