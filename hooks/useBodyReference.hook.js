import { useEffect, useRef } from 'react';

function useBodyReference() {
  const bodyReference = useRef(null);

  useEffect(() => {
    bodyReference.current = document.body;
  }, []);

  return bodyReference;
}

export { useBodyReference };
