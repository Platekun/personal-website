import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { assign, createMachine, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';

import { ProcessMachine } from '../file-window/file-window.controller';
import { File } from '../../models/file';
import { Directory } from '../../models/directory';
import { Workspace } from '../../models/workspace';

import {
  filaName,
  h1,
  list,
  listItem,
  text,
  NEW_LINE,
} from '../../utils/file-markup';
import { MonthNamesMap } from '../../utils/months';

function WorkspaceMachine(workspace) {
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
            WINDOW_OPENED: {
              actions: ['openWindow'],
            },
            WINDOW_SELECTED: {
              actions: ['updateWindowsStack'],
            },
            WINDOW_CLOSED: {
              actions: ['terminateProcess'],
            },
          },
        },
      },
    },
    {
      actions: {
        openWindow: assign({
          processes: (context, event) => {
            const {
              payload: { filename, parent },
            } = event;

            const processId = uuid();

            const target = workspace.get(filename, parent);

            const processMachine = ProcessMachine({ processId, target });

            const processMachineRef = spawn(processMachine, processId);

            return {
              ...context.processes,
              [processId]: processMachineRef,
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

function transformPropsToWorkspace(props) {
  const profileFile = new File('profile', {
    extension: 'md',
    content:
      h1('Professional Profile') +
      list(
        props.profile.reduce(
          (content, line) => content + listItem(text(line)) + NEW_LINE,
          ''
        )
      ),
    initialWindowDimensions: {
      width: 800,
      height: 500,
    },
  });

  const experienceDirectory = new Directory(
    'experience',
    ...props.experience.map((workExperience) => {
      const workExperienceFileTitle = `${workExperience.jobTitle.join(
        ' / '
      )}, ${workExperience.employer} (${
        MonthNamesMap[workExperience.from.month]
      } ${workExperience.from.year} - ${
        MonthNamesMap[workExperience.to.month]
      } ${workExperience.to.year})`;

      return new File(workExperience.employer, {
        extension: 'md',
        content:
          h1(workExperienceFileTitle) +
          list(
            workExperience.description.reduce(
              (content, line) => content + listItem(text(line)),
              ''
            )
          ),
        initialWindowDimensions: {
          width: 600,
          height: 300,
        },
      });
    })
  );

  const functionsFile = new File('functions', {
    extension: 'md',
    content:
      h1('What I Do') +
      list(
        props.functions
          .map((func) => func.description)
          .reduce((content, line) => content + listItem(text(line)), '')
      ),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const toolingFile = new File('tooling', {
    extension: 'md',
    content:
      h1('Tools I use') +
      list(
        props.tooling.reduce((content, line) => content + listItem(text(line)))
      ),
    initialWindowDimensions: {
      width: 400,
      height: 200,
    },
  });

  const socialMediaFile = new File('social_media', {
    extension: 'md',
    content:
      h1('Social Media') +
      list(
        Object.entries(props.socialMedia)
          .map(([, url]) => `<a href="${url} target="_blank">${url}</a>`)
          .reduce((content, line) => content + listItem(text(line)), '')
      ),
    initialWindowDimensions: {
      width: 550,
      height: 280,
    },
  });

  return new Workspace(
    profileFile,
    experienceDirectory,
    functionsFile,
    toolingFile,
    socialMediaFile
  );
}

function useController(props) {
  const workspaceMachine = useMemo(() => {
    const workspace = transformPropsToWorkspace(props);

    return WorkspaceMachine(workspace);
  }, []);

  const [state, send] = useMachine(workspaceMachine);

  const {
    context: { processes: processesMap, windowsStack },
  } = state;

  const openFile = (event) => {
    const filename = event.currentTarget.getAttribute('data-filename');

    const parent = event.currentTarget.getAttribute('data-parent-directory');

    send({
      type: 'WINDOW_OPENED',
      payload: {
        filename,
        parent,
      },
    });
  };

  const openFileByPressingEnter = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    const filename = event.currentTarget.getAttribute('data-filename');

    send({
      type: 'WINDOW_OPENED',
      payload: {
        filename,
        parent,
      },
    });
  };

  const processes = Object.entries(processesMap).map((processEntry) => {
    const [processId, processReference] = processEntry;

    const windowsStackProccessIndex = windowsStack.findIndex(
      (currentProccessId) => {
        return currentProccessId === processId;
      }
    );

    const order = (windowsStack.length - windowsStackProccessIndex) * 10;

    return {
      processId,
      reference: processReference,
      order,
    };
  });

  return {
    refs: {},
    computed: {
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
