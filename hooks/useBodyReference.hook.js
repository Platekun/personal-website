import { useEffect, useRef } from 'react';

function useBodyReference() {
  const bodyReference = useRef(null);

  useEffect(function selectDocumentBody() {
    bodyReference.current = document.body;
  }, []);

  return bodyReference;
}

export { useBodyReference };
