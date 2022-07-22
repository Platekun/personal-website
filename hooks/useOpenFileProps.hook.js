import { useCallback } from 'react';

function useOpenFileHandlers(send, eventType) {
  const openFile = useCallback(
    (event) => {
      const fileId = event.currentTarget.getAttribute('data-file-id');

      return send({
        type: eventType,
        payload: {
          fileId,
        },
      });
    },
    [send]
  );

  const openFileByPressingEnter = useCallback(
    (event) => {
      if (event.key !== 'Enter') {
        return;
      }

      const fileId = event.currentTarget.getAttribute('data-file-id');

      send({
        type: eventType,
        payload: {
          fileId,
        },
      });
    },
    [send]
  );

  return {
    openFile,
    openFileByPressingEnter,
  };
}

export { useOpenFileHandlers };
