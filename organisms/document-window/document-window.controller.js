import { assign, createMachine, sendParent } from 'xstate';
import { useActor } from '@xstate/react';

function DocumentProccessMachine(options) {
  const { processId, document } = options;

  return createMachine(
    {
      id: processId,
      initial: 'setup',
      context: {
        processId,
        title: document.name,
        content: document.content,
        editing: false,
        dimensions: document.initialDimensions,
        coordinates: document.initialCoordinates,
      },
      states: {
        setup: {
          always: {
            target: 'idle',
            actions: ['notifySelection'],
          },
        },
        idle: {
          on: {
            PROCCESS_ACTIVATED: {
              actions: ['notifySelection'],
            },
            EDITION_TOGGLED: {
              actions: ['toggleEdition'],
            },
            PROCCESS_TERMINATED: {
              target: 'terminated',
              actions: ['notifyTermination'],
            },
          },
        },
        terminated: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        notifySelection: sendParent({
          type: 'PROCCESS_ACTIVATED',
          payload: {
            processId,
          },
        }),
        toggleEdition: assign({
          editing: (context) => {
            const { editing } = context;

            return !editing;
          },
        }),
        notifyTermination: sendParent({
          type: 'PROCCESS_TERMINATED',
          payload: {
            processId,
          },
        }),
      },
    }
  );
}

function useController(props) {
  const { process, order, isActive } = props;

  const [state, send] = useActor(process);

  const {
    context: { processId, title, content, editing, dimensions, coordinates },
  } = state;

  const selectWindow = () => {
    send({
      type: 'PROCCESS_ACTIVATED',
    });
  };

  const toggleEdition = () => {
    send({
      type: 'EDITION_TOGGLED',
    });
  };

  const terminateProccess = () => {
    send({
      type: 'PROCCESS_TERMINATED',
    });
  };

  return {
    refs: {},
    data: {
      processId,
      title,
      content,
      order,
      isActive,
      dimensions,
      coordinates,
    },
    computed: {
      isEditing: editing,
    },
    handlers: {
      selectWindow,
      toggleEdition,
      terminateProccess,
    },
  };
}

export { useController, DocumentProccessMachine };
