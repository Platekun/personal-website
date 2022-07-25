import Head from 'next/head';
import Image from 'next/image';

import { useController } from './desktop.controller';
import DocumentWindow from '../document-window';
import DirectoryWindow from '../directory-window';
import FileIconButton from '../file-icon-button';
import backgroundPng from '../../public/kaneki-looking-at-city.png';

const INITIAL_ANIMATION_DELAY_IN_SECONDS = 1;
const FADE_IN_DURATION_IN_SECONDS = 0.5;

function Desktop(props) {
  const { computed, handlers } = useController(props);

  return (
    <>
      <Head>
        <title>Carlos Lobo's Page</title>
        <meta name="description" content="Carlos Camilo Lobo's personal page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="portal-root" />

      <main className="flex flex-col items-center h-screen overflow-hidden">
        <div>
          <header
            className="px-8 h-20 flex items-center justify-start opacity-0 animate-fade-in-downwards"
            style={{
              animationDelay: `${4 * INITIAL_ANIMATION_DELAY_IN_SECONDS}s`,
            }}
          >
            <h1 className="font-bold select-none">
              <span className="text-4xl text-white text-bitwise">
                wolf@future_widget_lab
              </span>
            </h1>
          </header>

          <div className="flex flex-row px-8 gap-4">
            <div
              className="opacity-0 animate-fade-in-downwards"
              style={{
                animationDelay: `${INITIAL_ANIMATION_DELAY_IN_SECONDS}s`,
              }}
            >
              <Image src={backgroundPng} className="object-cover" />
            </div>

            <div
              className="flex flex-col gap-8 items-center justify-center opacity-0 animate-fade-in-upwards"
              style={{
                animationDelay: `${
                  INITIAL_ANIMATION_DELAY_IN_SECONDS +
                  2 * FADE_IN_DURATION_IN_SECONDS
                }s`,
              }}
            >
              <h2 className="text-white flex flex-col text-center">
                <span className="text-[100px] text-honoka-shin-antique">
                  “<span className="italic ">はじめまして</span>”
                </span>
                <span className="text-bitwise text-4xl">
                  💬 (Nice to meet you)
                </span>
              </h2>

              <section className="pr-8 pl-8 flex justify-center">
                <ul className="flex flex-row gap-4">
                  {computed.contents.map((fileOrDirectory, index) => (
                    <li key={fileOrDirectory.fileId} className="w-32">
                      <FileIconButton
                        variant={fileOrDirectory.contentType}
                        fileId={fileOrDirectory.fileId}
                        filename={fileOrDirectory.filename}
                        onDoubleClick={handlers.openFile}
                        onKeyPress={handlers.openFileByPressingEnter}
                        style={{
                          animationDelay: `${
                            INITIAL_ANIMATION_DELAY_IN_SECONDS +
                            4 * FADE_IN_DURATION_IN_SECONDS +
                            index / 5
                          }s`,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        {computed.processes.map((process) => {
          if (process.isDirectory) {
            return (
              <DirectoryWindow
                key={process.processId}
                process={process.reference}
                order={process.order}
              />
            );
          } else {
            return (
              <DocumentWindow
                key={process.processId}
                process={process.reference}
                order={process.order}
              />
            );
          }
        })}
      </main>
    </>
  );
}

export { Desktop };
