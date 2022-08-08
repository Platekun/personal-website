import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { assign, createMachine, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';
import computeIsMobile from 'ismobilejs';

import { useTransformer } from 'hooks/useTransformer.hook';
import { useOpenFile } from 'organisms/file-icon-button/useOpenFile.hook';
import { usePageProps } from 'hooks/usePageProps.hook';
import { DirectoryProccessMachine } from 'organisms/directory-window/directory-window.controller';
import { DocumentProccessMachine } from 'organisms/document-window/document-window.controller';
import { File } from 'models/file.model';
import { Directory } from 'models/directory.model';
import { transformProfileToContent } from 'transformers/resume-profile.transformer';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';
import { transformRoleFunctionsToContent } from 'transformers/resume-functions.transformer';
import { transformToolingToContent } from 'transformers/resume-tooling.transformer';
import { transformSocialMediaToContent } from 'transformers/resume-social-media.transformer';
import { useIsMobile } from 'hooks/useIsMobile';

// TODO: Remove once dynamic `import`(s) can handle dynamic path(s).
const workExperiencesImageLoaders = {
  'ticom-erp.webp': () => import('../../public/ticom-erp.webp'),
  'ticom-erp-1.webp': () => import('../../public/ticom-erp-1.webp'),
  'ticom-erp-2.webp': () => import('../../public/ticom-erp-2.webp'),
  'ticom-erp-3.webp': () => import('../../public/ticom-erp-3.webp'),
  'be-girl-app-1.webp': () => import('../../public/be-girl-app-1.webp'),
  'be-girl-app-2.webp': () => import('../../public/be-girl-app-2.webp'),
  'luna-intake-form-first-part.webp': () =>
    import('../../public/luna-intake-form-first-part.webp'),
  'luna-care-credentialing-form.webp': () =>
    import('../../public/luna-care-credentialing-form.webp'),
  'luna-dashboard.webp': () => import('../../public/luna-dashboard.webp'),
  'sony-competition-center.webp': () =>
    import('../../public/sony-competition-center.webp'),
  'sony-competition-center-colombia.webp': () =>
    import('../../public/sony-competition-center-colombia.webp'),
};

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
          invoke: {
            id: 'cleanup',
            src: () => (callback) => {
              const handleWindowResize = () => {
                const isMobile = computeIsMobile().any;

                if (isMobile) {
                  callback({ type: 'PROCESSES_TERMINATED' });
                }
              };

              window.addEventListener('resize', handleWindowResize);

              return () => {
                window.removeEventListener('resize', handleWindowResize);
              };
            },
          },
          on: {
            EXPERIENCE_DIRECTORY_CONTENTS_REQUESTED: {
              actions: ['fetchDirectoryContents'],
            },
            PROCCESS_INITIALIZATION_REQUESTED: {
              actions: ['initializeProccessOrFocusExistingProccess'],
            },
            PROCCESS_ACTIVATED: {
              actions: ['updateWindowsStack'],
            },
            PROCCESS_TERMINATED: {
              actions: ['terminateProcess'],
            },
            PROCESSES_TERMINATED: {
              actions: ['terminateProcesses'],
            },
          },
        },
      },
    },
    {
      actions: {
        fetchDirectoryContents: () => {
          const experienceDirectory = desktop.contents[1];

          experienceDirectory.contents.forEach((file) => file.fetchContent());
        },
        initializeProccessOrFocusExistingProccess: assign({
          processes: (context, event) => {
            const {
              payload: { fileId },
            } = event;

            const existingProccess = Object.values(context.processes).find(
              (proccessValue) => proccessValue.fileId === fileId
            );

            if (existingProccess) {
              return context.processes;
            }

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
                fileId,
                isDirectory,
                reference,
              },
            };
          },
          windowsStack: (context, event) => {
            const { windowsStack } = context;
            const {
              payload: { fileId },
            } = event;

            const existingProccessEntry = Object.entries(
              context.processes
            ).find(([, proccessValue]) => proccessValue.fileId === fileId);

            if (!existingProccessEntry) {
              return context.windowsStack;
            }

            const existingProccessEntryId = existingProccessEntry[0];

            return [
              existingProccessEntryId,
              ...windowsStack.filter(
                (currentProccessId) =>
                  currentProccessId !== existingProccessEntryId
              ),
            ];
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
              ...windowsStack.filter(
                (currentProccessId) => currentProccessId !== processId
              ),
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
        terminateProcesses: assign({
          processes: (context) => {
            Object.values(context.processes).forEach((processValue) => {
              processValue.reference.stop();
            });

            return {};
          },
        }),
      },
    }
  );
}

function transformPropsIntoModels(props) {
  const profileFile = new File('profile', {
    id: props.profileRecord.id,
    extension: 'md',
    content: transformProfileToContent(props.profileRecord),
    initialWindowDimensions: {
      width: 800,
      height: 500,
    },
  });

  const experienceDirectory = new Directory('experience', {
    id: props.workExperiencesCollection.id,
    contents: props.workExperiencesCollection.collection.map(
      (workExperienceCollectionItem) => {
        return new File(workExperienceCollectionItem.content.employer, {
          id: workExperienceCollectionItem.id,
          extension: 'md',
          async content() {
            const imageModules = await Promise.all(
              workExperienceCollectionItem.content.images.map(async (image) => {
                const loadModule = workExperiencesImageLoaders[image.filename];

                const module = await loadModule();

                return {
                  image: module.default,
                  alt: image.alt,
                };
              })
            );

            return transformWorkExperienceToContent({
              workExperienceCollectionItem,
              imageModules,
            });
          },
          initialWindowDimensions: {
            width: 800,
            height: 500,
          },
        });
      }
    ),
    initialWindowDimensions: {
      width: 600,
      height: 200,
    },
  });

  const functionsFile = new File('functions', {
    id: props.functionsCollection.id,
    extension: 'md',
    content: transformRoleFunctionsToContent(props.functionsCollection),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const toolingFile = new File('tooling', {
    id: props.toolingCollection.id,
    extension: 'md',
    content: transformToolingToContent(props.toolingCollection),
    initialWindowDimensions: {
      width: 600,
      height: 400,
    },
  });

  const socialMediaFile = new File('soc_media', {
    id: props.socialMediaCollection.id,
    extension: 'md',
    content: transformSocialMediaToContent(props.socialMediaCollection),
    initialWindowDimensions: {
      width: 600,
      height: 300,
    },
  });

  return new Directory('desktop', {
    id: 'desktop',
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
  const { resume } = props;

  const { isMobile, breakpointHelpers } = usePageProps();

  const desktop = useTransformer(resume, transformPropsIntoModels);
  const operativeSystem = useTransformer(desktop, OperativeSystemMachine, []);

  const [state, send] = useMachine(operativeSystem);

  const {
    context: { processes: processesMap, windowsStack },
  } = state;

  const { openFileWithMouse, openFileWithKeyboard } = useOpenFile({
    onOpenFile: (fileId) => {
      send({
        type: 'PROCCESS_INITIALIZATION_REQUESTED',
        payload: { fileId },
      });
    },
  });

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

  const [{ processId: topProccessId } = { processId: null }] = processes.sort(
    (a, b) => b.order - a.order
  );

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (!isMobile) {
        send({ type: 'EXPERIENCE_DIRECTORY_CONTENTS_REQUESTED' });
      }
    }, [isMobile]);
  }

  return {
    refs: {},
    computed: {
      isMobile,
      contents,
      processes,
      topProccessId,
      ...breakpointHelpers,
    },
    data: {
      profileRecord: resume.profileRecord,
      workExperiencesCollection: resume.workExperiencesCollection,
      functionsCollection: resume.functionsCollection,
      toolingCollection: resume.toolingCollection,
      socialMediaCollection: resume.socialMediaCollection,
    },
    handlers: {
      openFileWithMouse,
      openFileWithKeyboard,
    },
  };
}

export { useController };
