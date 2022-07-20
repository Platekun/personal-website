import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { assign, createMachine, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';

import { MonthNamesMap } from '../../utils/months';
import { ProcessMachine } from '../file-window/file-window.controller';

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

function findTarget(fieName, items) {
  // Note: Only works for first level!
  const item = items.find((currentItem) => {
    return currentItem.name === fieName;
  });

  return item;
}

class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

class Directory {
  constructor(name, ...files) {
    this.name = name;
    this.files = files;
  }
}

class Workspace {
  constructor(...items) {
    this.items = items;
  }

  get(targetName) {
    return findTarget(targetName, this.items);
  }
}

const NEW_LINE = '\n';

function filaName(s) {
  return `${s.toLowerCase()}.txt`;
}

function h1(s) {
  return `<h1 class="mb-4">${s}</h1>`;
}

function list(s) {
  return `<ul>${s}</ul>`;
}

function listItem(s) {
  return `<li>${s}</li>`;
}

function text(s) {
  return `<p>${s}</p>`;
}

function transformPropsToWorkspace(props) {
  const profileFileName = filaName('profile');

  const profileFileTitle = 'Professional Profile';

  const profileFileContent =
    h1(profileFileTitle) +
    list(
      props.profile.reduce(
        (content, line) => content + listItem(text(line)) + NEW_LINE,
        ''
      )
    );
  const profileFile = new File(profileFileName, profileFileContent);

  const experienceDirectory = new Directory(
    'experience',
    ...props.experience.map((workExperience) => {
      const workExperienceFileName = filaName(workExperience.employer);

      const workExperienceFileTitle = `${workExperience.jobTitle.join(
        ' / '
      )}, ${workExperience.employer} (${
        MonthNamesMap[workExperience.from.month]
      } ${workExperience.from.year} - ${
        MonthNamesMap[workExperience.to.month]
      } ${workExperience.to.year})`;

      const workExperienceFileContent =
        h1(workExperienceFileTitle) +
        list(
          workExperience.description.reduce(
            (content, line) => content + listItem(text(line)),
            ''
          )
        );

      return new File(workExperienceFileName, workExperienceFileContent);
    })
  );

  const functionsFileName = filaName('functions');

  const functionsFileTitle = 'What I Do';

  const functionsFileContent =
    h1(functionsFileTitle) +
    list(
      props.functions
        .map((func) => func.description)
        .reduce((content, line) => content + listItem(text(line)), '')
    );

  const functionsFile = new File(functionsFileName, functionsFileContent);

  const toolingFileName = filaName('tooling');

  const toolingFileTitle = 'Tools I use';

  const toolingFileContent =
    h1(toolingFileTitle) +
    list(
      props.tooling.reduce((content, line) => content + listItem(text(line)))
    );

  const toolingFile = new File(toolingFileName, toolingFileContent);

  const socialMediaFileName = filaName('social_media');

  const socialMediaFileTitle = 'Social Media';

  const socialMediaFileContent =
    h1(socialMediaFileTitle) +
    list(
      Object.entries(props.socialMedia)
        .map(([, url]) => `<a href="${url}">${url}</a>`)
        .reduce((content, line) => content + listItem(text(line)), '')
    );

  const socialMediaFile = new File(socialMediaFileName, socialMediaFileContent);

  const workspace = new Workspace(
    profileFile,
    experienceDirectory,
    functionsFile,
    toolingFile,
    socialMediaFile
  );

  return workspace;
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
    if (event.key === 'Enter') {
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
