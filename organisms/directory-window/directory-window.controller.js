import { createMachine, sendParent } from 'xstate';
import { useActor } from '@xstate/react';

import { Directory } from '../../models/directory.model';
import { useOpenFile } from '../file-icon-button/useOpenFile.hook';

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
        dimensions: directory.initialDimensions,
        coordinates: directory.initialCoordinates,
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
  const { process, order, isActive } = props;

  const [state, send] = useActor(process);

  const {
    context: {
      processId,
      title,
      contents: directoryContents,
      dimensions,
      coordinates,
    },
  } = state;

  const { openFileWithMouse, openFileWithKeyboard } = useOpenFile({
    onOpenFile: (fileId) => {
      send({
        type: 'PROCCESS_INITIALIZATION_REQUESTED',
        payload: { fileId },
      });
    },
  });

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
      coordinates,
      isActive,
      dimensions,
    },
    computed: {
      contents,
    },
    handlers: {
      selectWindow,
      toggleEdition,
      terminateProccess,
      openFileWithMouse,
      openFileWithKeyboard,
    },
  };
}

export { useController, DirectoryProccessMachine };
