import { timeline } from 'motion';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

import { createWindowId } from 'utils/createWindowId';
import { usePageProps } from 'hooks/usePageProps.hook';

function WindowMachine(options) {
  const { windowId, coordinates, onSelected, onClosed } = options;

  return createMachine(
    {
      id: windowId,
      initial: 'setup',
      context: {
        delta: {
          dx: 0,
          dy: 0,
        },
        anchor: {
          x: coordinates.x,
          y: coordinates.y,
        },
        pointer: {
          x: 0,
          y: 0,
        },
      },
      states: {
        setup: {
          after: {
            4: {
              target: 'idle',
              actions: ['notifySelection'],
            },
          },
        },
        idle: {
          entry: ['resetPointer'],
          on: {
            WINDOW_GRABBED: {
              target: 'dragging',
              actions: ['savePointer', 'notifySelection'],
            },
            WINDOW_SELECTED: {
              actions: ['notifySelection'],
            },
            WINDOW_CLOSED: {
              target: 'closed',
              actions: ['notifyClosure'],
            },
          },
        },
        dragging: {
          on: {
            POSITION_UPDATED: {
              actions: ['updateDelta'],
            },
            WINDOW_RELEASED: {
              target: 'idle',
              actions: ['updateAnchor', 'resetDelta'],
            },
          },
        },
        closed: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        resetPointer: assign({
          pointer: {
            x: 0,
            y: 0,
          },
        }),
        savePointer: assign({
          pointer: (_context, event) => {
            const { clientX, clientY } = event.payload;

            return {
              x: clientX,
              y: clientY,
            };
          },
        }),
        updateDelta: assign({
          delta: (context, event) => {
            const { clientX, clientY } = event.payload;

            return {
              dx: clientX - context.pointer.x,
              dy: clientY - context.pointer.y,
            };
          },
        }),
        updateAnchor: assign({
          anchor: () => {
            const { x, y } = document
              .getElementById(windowId)
              .getBoundingClientRect();

            return {
              x,
              y,
            };
          },
        }),
        resetDelta: assign({
          delta: {
            dx: 0,
            dy: 0,
          },
        }),
        notifySelection: () => {
          onSelected();
        },
        notifyClosure: () => {
          onClosed();
        },
      },
    }
  );
}

function useController(props) {
  const {
    proccessId,
    dimensions,
    coordinates,
    order,
    isActive,
    onSelected,
    onClosed,
    isSelectionEnabled,
  } = props;

  const sectionReference = useRef(null);

  const windowId = createWindowId(proccessId);

  const windowMachine = useMemo(
    () =>
      WindowMachine({
        windowId,
        coordinates,
        onSelected,
        onClosed,
      }),
    []
  );

  const [state, send] = useMachine(windowMachine);

  const {
    context: { delta, anchor },
  } = state;

  const { bodyReference } = usePageProps();

  const isSetup = state.matches('setup');

  const isIdle = state.matches('idle');

  const isDragging = state.matches('dragging');

  const selectWindow = () => {
    send({
      type: 'WINDOW_SELECTED',
    });
  };

  const dragWindow = (event) => {
    send({
      type: 'WINDOW_GRABBED',
      payload: {
        clientX: event.clientX,
        clientY: event.clientY,
      },
    });
  };

  const closeWindow = () => {
    send({
      type: 'WINDOW_CLOSED',
    });
  };

  // Note: Usually one would perform a Tailwind transition for this cases but my problem was that the Tailwind transition used `transform` as well as my initial coordinates which created a bizzare effect.
  // I could not find a proper way to display the transition effect using Tailwind because the values I was using used dynamic values from the window (window and height).
  useEffect(() => {
    if (sectionReference.current === null) {
      return;
    }

    timeline([
      [
        sectionReference.current,
        { scale: 0, opacity: 0, x: coordinates.x, y: coordinates.y },
        { duration: 0.15 },
      ],
      [
        sectionReference.current,
        { scale: 1, opacity: 1, x: coordinates.x, y: coordinates.y },
        { duration: 0.15 },
      ],
    ]);
  }, [sectionReference]);

  useEffect(() => {
    if (bodyReference === null) {
      return;
    }

    const handleMouseMove = (event) => {
      if (!isDragging) {
        return;
      }

      send({
        type: 'POSITION_UPDATED',
        payload: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
      });
    };

    const handleMouseUp = () => {
      send({
        type: 'WINDOW_RELEASED',
      });
    };

    bodyReference.current.addEventListener('mousemove', handleMouseMove);
    bodyReference.current.addEventListener('mouseup', handleMouseUp);

    return () => {
      bodyReference.current.removeEventListener('mousemove', handleMouseMove);
      bodyReference.current.removeEventListener('mouseup', handleMouseUp);
    };
  }, [bodyReference, isDragging]);

  return {
    refs: {
      sectionReference,
    },
    data: {
      dimensions,
      coordinates,
      delta,
      anchor,
      order,
      isActive,
      isSelectionEnabled,
    },
    computed: {
      isSetup,
      isIdle,
      isDragging,
      windowId,
    },
    handlers: {
      selectWindow,
      dragWindow,
      closeWindow,
    },
  };
}

export { useController };
