import { assign, createMachine, sendParent } from 'xstate';
import { useActor } from '@xstate/react';

import { useEffect, useRef } from 'react';
import { useBodyReference } from '../../hooks/useBodyReference.hook';

function windowId(processId) {
  return `window-${processId}`;
}

function ProcessMachine(options) {
  const { processId, target } = options;

  return createMachine(
    {
      id: `Process (${processId})`,
      initial: 'setup',
      context: {
        selected: false,
        processId,
        editing: false,
        title: target.name,
        content: target.content,
        dimensions: {
          width: 0,
          height: 0,
        },
        delta: {
          dx: 0,
          dy: 0,
        },
        pointer: {
          x: 0,
          y: 0,
        },
        anchor: {
          x: 0,
          y: 0,
        },
      },
      states: {
        setup: {
          always: {
            target: 'idle',
            actions: [
              'computeInitialWindownDimensions',
              'notifyParentThatWindowWasSelected',
            ],
          },
        },
        idle: {
          entry: ['resetPointer'],
          on: {
            TERMINATED: {
              target: 'terminated',
            },
            WINDOW_GRABBED: {
              target: 'dragging',
              actions: ['savePointer', 'notifyParentThatWindowWasSelected'],
            },
            WINDOW_SELECTED: {
              actions: ['notifyParentThatWindowWasSelected'],
            },
            EDITION_TOGGLED: {
              actions: ['toggleEdition'],
            },
            WINDOW_CLOSED: {
              target: 'terminated',
              actions: ['notifyParentWindowClosure'],
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
        terminated: {
          type: 'final',
        },
      },
      on: {
        SELECTED: {
          actions: ['markAsSelected'],
        },
      },
    },
    {
      actions: {
        notifyParentThatWindowWasSelected: sendParent({
          type: 'WINDOW_SELECTED',
          payload: {
            processId,
          },
        }),
        computeInitialWindownDimensions: assign({
          dimensions: {
            width: 200,
            height: 200,
          },
        }),
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

            console.info({
              dx: clientX - context.pointer.x,
              dy: clientY - context.pointer.y,
            });

            return {
              dx: clientX - context.pointer.x,
              dy: clientY - context.pointer.y,
            };
          },
        }),
        updateAnchor: assign({
          anchor: () => {
            const { x, y } = document
              .getElementById(windowId(processId))
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
        toggleEdition: assign({
          editing: (context) => {
            const { editing } = context;

            return !editing;
          },
        }),
        notifyParentWindowClosure: sendParent({
          type: 'WINDOW_CLOSED',
          payload: {
            processId,
          },
        }),
      },
    }
  );
}

function useController(props) {
  const { process, order } = props;

  const [state, send] = useActor(process);
  const appBarReference = useRef(null);

  const {
    context: {
      editing: isEditing,
      title,
      content,
      dimensions,
      delta,
      anchor,
      processId,
    },
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

  const toggleEdition = () => {
    send({
      type: 'EDITION_TOGGLED',
    });
  };

  const closeWindow = () => {
    send({
      type: 'WINDOW_CLOSED',
    });
  };

  useEffect(() => {
    if (bodyReference === null) {
      return;
    }

    const handleMouseMove = (event) => {
      if (appBarReference === null) {
        return;
      }

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
      appBarReference,
    },
    data: {
      title,
      content,
      dimensions,
      delta,
      anchor,
      order,
    },
    computed: {
      isIdle,
      isDragging,
      isEditing,
      windowId: windowId(processId),
    },
    handlers: {
      selectWindow,
      dragWindow,
      toggleEdition,
      closeWindow,
    },
  };
}

export { useController, ProcessMachine };
