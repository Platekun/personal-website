import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { assign, createMachine, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';

import { useTransformer } from 'hooks/useTransformer.hook';
import { useOpenFileHandlers } from 'hooks/useOpenFileProps.hook';
import { usePageProps } from 'hooks/usePageProps.hook';
import { DirectoryProccessMachine } from 'organisms/directory-window/directory-window.controller';
import { DocumentProccessMachine } from 'organisms/document-window/document-window.controller';
import { File } from 'models/file';
import { Directory } from 'models/directory';
import { createProfileContent } from 'transformers/resume-profile.transformer';
import { createExperienceContent } from 'transformers/resume-work-experience.transformer';
import { createFunctionsContent } from 'transformers/resume-functions.transformer';
import { createToolingContent } from 'transformers/resume-tooling.transformer';
import { createSocialMediaContent } from 'transformers/resume-social-media.transformer';

function OperativeSystemMachine(desktop) {
  return createMachine(
    {
      id: 'Operative System',
      initial: 'idle',
      context: {
        processes: {},
        windowsStack: [],
      },
      states: {
        idle: {
          on: {
            PROCCESS_INITIALIZATION_REQUESTED: {
              actions: ['initializeProccess'],
            },
            PROCCESS_ACTIVATED: {
              actions: ['updateWindowsStack'],
            },
            PROCCESS_TERMINATED: {
              actions: ['terminateProcess'],
            },
          },
        },
      },
    },
    {
      actions: {
        initializeProccess: assign({
          processes: (context, event) => {
            const {
              payload: { fileId },
            } = event;

            const processId = uuid();

            const searchResult = desktop.search(fileId);

            const isDirectory = searchResult instanceof Directory;

            const machine = isDirectory
              ? DirectoryProccessMachine({
                  processId,
                  directory: searchResult,
                })
              : DocumentProccessMachine({
                  processId,
                  document: searchResult,
                });

            const reference = spawn(machine, processId);

            return {
              ...context.processes,
              [processId]: {
                isDirectory,
                reference,
              },
            };
          },
        }),
        updateWindowsStack: assign({
          windowsStack: (context, event) => {
            const { windowsStack } = context;
            const {
              payload: { processId },
            } = event;

            return [
              processId,
              ...windowsStack.filter((currentProccessId) => {
                return currentProccessId !== processId;
              }),
            ];
          },
        }),
        terminateProcess: assign({
          processes: (context, event) => {
            const {
              payload: { processId },
            } = event;

            const { reference } = context.processes[processId];

            reference.stop();

            delete context.processes[processId];

            return {
              ...context.processes,
            };
          },
        }),
      },
    }
  );
}

function transformPropsIntoModels(props) {
  const profileFile = new File('profile', {
    extension: 'md',
    content: createProfileContent(props.profile),
    initialWindowDimensions: {
      width: 800,
      height: 500,
    },
  });

  const experienceDirectory = new Directory('experience', {
    contents: props.experience.map((workExperience) => {
      return new File(workExperience.employer, {
        extension: 'md',
        content: createExperienceContent(workExperience),
        initialWindowDimensions: {
          width: 800,
          height: 500,
        },
      });
    }),
    initialWindowDimensions: {
      width: 600,
      height: 200,
    },
  });

  const functionsFile = new File('functions', {
    extension: 'md',
    content: createFunctionsContent(props.functions),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const toolingFile = new File('tooling', {
    extension: 'md',
    content: createToolingContent(props.tooling),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const socialMediaFile = new File('soc_media', {
    extension: 'md',
    content: createSocialMediaContent(props.socialMedia),
    initialWindowDimensions: {
      width: 600,
      height: 300,
    },
  });

  return new Directory('desktop', {
    contents: [
      profileFile,
      experienceDirectory,
      functionsFile,
      toolingFile,
      socialMediaFile,
    ],
  });
}

function useController(props) {
  const { Resume } = props;

  const { isMobile, breakpointHelpers } = usePageProps();

  const desktop = useTransformer(Resume, transformPropsIntoModels);
  const operativeSystem = useTransformer(desktop, OperativeSystemMachine, []);

  const [state, send] = useMachine(operativeSystem);

  const {
    context: { processes: processesMap, windowsStack },
  } = state;

  const { openFile, openFileByPressingEnter } = useOpenFileHandlers(
    send,
    'PROCCESS_INITIALIZATION_REQUESTED'
  );

  const contents = desktop.contents.map((fileOrDirectory) => {
    return {
      fileId: fileOrDirectory.id,
      filename: fileOrDirectory.name,
      contentType:
        fileOrDirectory instanceof Directory ? 'directory' : 'document',
      entryFilename:
        fileOrDirectory instanceof Directory
          ? fileOrDirectory.contents[fileOrDirectory.contents.length - 1].name
          : null,
    };
  });

  const processes = Object.entries(processesMap).map((processEntry) => {
    const [processId, { isDirectory, reference }] = processEntry;

    const windowsStackProccessIndex = windowsStack.findIndex(
      (currentProccessId) => {
        return currentProccessId === processId;
      }
    );

    const order = (windowsStack.length - windowsStackProccessIndex) * 10;

    return {
      processId,
      reference,
      isDirectory,
      order,
    };
  });

  return {
    refs: {},
    computed: {
      isMobile,
      contents,
      processes,
      ...breakpointHelpers,
    },
    data: {},
    handlers: {
      openFile,
      openFileByPressingEnter,
    },
  };
}

export { useController };
