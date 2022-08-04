import { useEffect, useRef } from 'react';

function useBodyReference() {
  if (typeof window === 'undefined') {
    return;
  }

  const bodyReference = useRef(null);

  useEffect(function selectDocumentBody() {
    bodyReference.current = document.body;
  }, []);

  return bodyReference;
}

export { useBodyReference };
