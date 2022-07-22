import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { assign, createMachine, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';

import { useOpenFileHandlers } from '../../hooks/useOpenFileProps.hook';
import { DirectoryProccessMachine } from '../directory-window/directory-window.controller';
import { DocumentProccessMachine } from '../document-window/document-window.controller';
import { File } from '../../models/file';
import { Directory } from '../../models/directory';

import {
  h2,
  horizontalList,
  verticalList,
  listItem,
  parragraph,
  link,
  clickable,
  image,
} from '../../utils/file-markup';
import { MonthNamesMap } from '../../utils/months';

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

function transformsPropsIntoADesktop(props) {
  const profileFile = new File('profile', {
    extension: 'md',
    content:
      h2('Professional Profile') +
      verticalList(
        props.profile.reduce(
          (content, line) => content + listItem(parragraph(line)),
          ''
        )
      ),
    initialWindowDimensions: {
      width: 800,
      height: 500,
    },
  });

  const experienceDirectory = new Directory('experience', {
    contents: props.experience.map((workExperience) => {
      return new File(workExperience.employer, {
        extension: 'md',
        content:
          h2(workExperience.jobTitle.join(' / ')) +
          parragraph(`Company Name: ${workExperience.employer}.`) +
          parragraph(`Company URL: ${link(`${workExperience.employerUrl}`)}`) +
          parragraph(
            `Employment period: (${MonthNamesMap[workExperience.from.month]} ${
              workExperience.from.year
            } - ${MonthNamesMap[workExperience.to.month]} ${
              workExperience.to.year
            }).`
          ) +
          horizontalList(
            workExperience.images.reduce(
              (content, img) =>
                content +
                listItem(clickable(img.source, image(img.source, img.alt))),
              ''
            )
          ) +
          verticalList(
            workExperience.description.reduce(
              (content, line) => content + listItem(parragraph(line)),
              ''
            )
          ),
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
    content:
      h2('What I Do') +
      verticalList(
        props.functions
          .map((func) => func.description)
          .reduce(
            (content, line) => content + listItem(parragraph(`* ${line}`)),
            ''
          )
      ),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const toolingFile = new File('tooling', {
    extension: 'md',
    content:
      h2(' Toolset') +
      verticalList(
        props.tooling.reduce(
          (content, line) => content + listItem(parragraph(`* ${line}`)),
          ''
        )
      ),
    initialWindowDimensions: {
      width: 380,
      height: 400,
    },
  });

  const socialMediaFile = new File('social_media', {
    extension: 'md',
    content:
      h2('Social Media') +
      verticalList(
        Object.entries(props.socialMedia)
          .map(([, url]) => link(url))
          .reduce(
            (content, line) => content + listItem(parragraph(`* ${line}`)),
            ''
          )
      ),
    initialWindowDimensions: {
      width: 550,
      height: 280,
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
  const desktop = useMemo(() => {
    const desktop = transformsPropsIntoADesktop(props);

    return desktop;
  }, []);

  const operativeSystem = useMemo(function computeOperativeSystemMachine() {
    return OperativeSystemMachine(desktop);
  }, []);

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
      contents,
      processes,
    },
    data: {},
    handlers: {
      openFile,
      openFileByPressingEnter,
    },
  };
}

export { useController };
