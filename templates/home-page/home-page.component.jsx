import React from 'react';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './home-page.controller';
import FileIconButton from 'organisms/file-icon-button';
import DocumentWindow from 'organisms/document-window';
import DirectoryWindow from 'organisms/directory-window';
import { transformProfileToContent } from 'transformers/resume-profile.transformer';
import { transformRoleFunctionsToContent } from 'transformers/resume-functions.transformer';
import { transformToolingToContent } from 'transformers/resume-tooling.transformer';
import { transformSocialMediaToContent } from 'transformers/resume-social-media.transformer';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';

const INITIAL_ANIMATION_DELAY_IN_SECONDS = 0.5;
const FADE_IN_DURATION_IN_SECONDS = 0.5;

function HomePageTemplate(props) {
  const { data, computed, handlers } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Page"
        description="Carlos Camilo Lobo's personal page"
      />

      <div id="portal-root" />

      <main
        className={classes(
          'flex flex-col items-center h-screen bg-home2 bg-center bg-cover',
          'sm:overflow-hidden'
        )}
      >
        <div className={classes('w-full max-w-7xl mx-auto', 'sm:h-full')}>
          <Header
            asLink={false}
            animate={!computed.isMobile}
            animationDelay={`${4 * INITIAL_ANIMATION_DELAY_IN_SECONDS}s`}
          />

          <div
            className={classes(
              'px-4 pb-4 flex flex-col h-[calc(100vh-4rem)] justify-end',
              'sm:px-8 sm:pb-24 sm:h-[calc(100vh-5rem)]',
              'md:pb-24',
              'lg:flex-row lg:justify-center'
            )}
          >
            <div
              className={classes(
                'flex flex-col items-center h-full justify-between gap-8',
                {
                  'opacity-0 animate-fade-in': !computed.isMobile,
                }
              )}
              style={
                !computed.isMobile
                  ? {
                      animationDelay: `${INITIAL_ANIMATION_DELAY_IN_SECONDS}s`,
                    }
                  : {}
              }
            >
              <h2
                className={classes(
                  'text-white flex flex-col text-center',
                  'sm:gap-6',
                  'md:gap-8',
                  'lg:gap-12'
                )}
              >
                <span
                  className={classes(
                    'text-3xl text-honoka-shin-antique',
                    'sm:text-6xl',
                    '2xl:text-[6.25em]'
                  )}
                >
                  <span className="">??????????????????</span>
                </span>
                <span
                  className={classes(
                    'text-sm text-bitwise',
                    'sm:text-2xl',
                    'lg:text-3xl',
                    '2xl:text-4xl'
                  )}
                >
                  ???? (Nice to meet you)
                </span>
              </h2>

              <section className={classes('flex justify-center', 'sm:px-8')}>
                <ul
                  className={classes(
                    'flex flex-wrap gap-4 justify-center max-w-sm',
                    'sm:max-w-none md:flex-row md:gap-4 md:flex-nowrap md:justify-start',
                    'lg:flex-row lg:flex-wrap'
                  )}
                >
                  {computed.contents.map((fileOrDirectory, index) => (
                    <li
                      key={`fileId:${
                        fileOrDirectory.fileId
                      }-isMobile:${computed.isMobile.toString()}`}
                      className={classes('w-24', 'sm:w-32')}
                    >
                      <FileIconButton
                        variant={fileOrDirectory.contentType}
                        fileId={fileOrDirectory.fileId}
                        filename={fileOrDirectory.filename}
                        entryFilename={fileOrDirectory.entryFilename}
                        onDoubleClick={handlers.openFileWithMouse}
                        onKeyPress={handlers.openFileWithKeyboard}
                        animate={!computed.isMobile}
                        animationDelay={`${
                          INITIAL_ANIMATION_DELAY_IN_SECONDS *
                            4 *
                            FADE_IN_DURATION_IN_SECONDS +
                          index / 5
                        }s`}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        {!computed.isMobile ? (
          <div className="hidden">
            {transformProfileToContent(data.profileRecord)}
            {transformRoleFunctionsToContent(data.functionsCollection)}
            {data.workExperiencesCollection.collection.map(
              (workExperienceCollectionItem) => (
                <React.Fragment key={workExperienceCollectionItem.id}>
                  {transformWorkExperienceToContent({
                    workExperienceCollectionItem,
                    ignoreImages: true,
                  })}
                </React.Fragment>
              )
            )}
            {transformToolingToContent(data.toolingCollection)}
            {transformSocialMediaToContent(data.socialMediaCollection)}
          </div>
        ) : null}

        {computed.processes.map((process) => {
          if (process.isDirectory) {
            return (
              <DirectoryWindow
                key={process.processId}
                process={process.reference}
                order={process.order}
                isActive={process.processId === computed.topProccessId}
              />
            );
          } else {
            return (
              <DocumentWindow
                key={process.processId}
                process={process.reference}
                order={process.order}
                isActive={process.processId === computed.topProccessId}
              />
            );
          }
        })}
      </main>
    </>
  );
}

export { HomePageTemplate };
