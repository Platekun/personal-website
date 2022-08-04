import { createMachine, sendParent } from 'xstate';
import { useActor } from '@xstate/react';

import { Directory } from '../../models/directory';
import { useOpenFileHandlers } from '../../hooks/useOpenFileProps.hook';

function DirectoryProccessMachine(options) {
  const { processId, directory } = options;

  return createMachine(
    {
      id: processId,
      initial: 'setup',
      context: {
        processId,
        title: directory.name,
        contents: directory.contents,
        dimensions: directory.initialWindowDimensions,
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
            PROCCESS_INITIALIZATION_REQUESTED: {
              actions: ['notifyInitialization'],
            },
            PROCCESS_ACTIVATED: {
              actions: ['notifySelection'],
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
        notifyInitialization: sendParent((_context, event) => {
          const {
            payload: { fileId },
          } = event;

          return {
            type: 'PROCCESS_INITIALIZATION_REQUESTED',
            payload: {
              fileId,
            },
          };
        }),
        notifySelection: sendParent({
          type: 'PROCCESS_ACTIVATED',
          payload: {
            processId,
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
  const { process, order } = props;

  const [state, send] = useActor(process);

  const {
    context: { processId, title, contents: directoryContents, dimensions },
  } = state;

  const { openFile, openFileByPressingEnter } = useOpenFileHandlers(
    send,
    'PROCCESS_INITIALIZATION_REQUESTED'
  );

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

  const contents = directoryContents.map((fileOrDirectory) => {
    return {
      fileId: fileOrDirectory.id,
      filename: fileOrDirectory.name,
      contentType:
        fileOrDirectory instanceof Directory ? 'directory' : 'document',
    };
  });

  return {
    refs: {},
    data: {
      processId,
      title,
      order,
      dimensions,
    },
    computed: {
      contents,
    },
    handlers: {
      selectWindow,
      toggleEdition,
      terminateProccess,
      openFile,
      openFileByPressingEnter,
    },
  };
}

export { useController, DirectoryProccessMachine };
