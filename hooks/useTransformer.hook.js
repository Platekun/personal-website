import { useMemo } from 'react';

function useTransformer(props, transformer) {
  return useMemo(() => transformer(props), [props, transformer]);
}

export { useTransformer };
