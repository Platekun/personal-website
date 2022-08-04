import { useEffect, useMemo, useRef } from 'react';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

import { useBodyReference } from 'hooks/useBodyReference.hook';
import { useCssAnimationCleanup } from 'hooks/useCssAnimationCleanup.hook';
import { createWindowId } from 'utils/createWindowId';

function WindowMachine(options) {
  const { windowId, onSelected, onClosed } = options;

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
          x: 0,
          y: 0,
        },
        pointer: {
          x: 0,
          y: 0,
        },
      },
      states: {
        setup: {
          always: {
            target: 'idle',
            actions: ['notifySelection'],
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
    order,
    onSelected,
    onClosed,
    allowMouseSelection,
  } = props;

  const sectionReference = useRef(null);

  useCssAnimationCleanup(sectionReference, [
    'animate-pop-and-fade',
    'opacity-0',
  ]);

  const windowId = createWindowId(proccessId);

  const windowMachine = useMemo(function computeWindowMachine() {
    return WindowMachine({
      windowId,
      onSelected,
      onClosed,
    });
  }, []);

  const [state, send] = useMachine(windowMachine);

  const {
    context: { delta, anchor },
  } = state;

  const bodyReference = useBodyReference();

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

  useEffect(
    function attachMouseListenersToBody() {
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
    },
    [bodyReference, isDragging]
  );

  return {
    refs: {
      sectionReference,
    },
    data: {
      dimensions,
      delta,
      anchor,
      order,
      allowMouseSelection,
    },
    computed: {
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
