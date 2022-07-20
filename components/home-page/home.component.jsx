import Head from 'next/head';

import { useController } from './home.controller';
import FileWindow from '../file-window';
import DesktopIconButton from '../deskop-icon-button';

function HomePage(props) {
  const { computed, handlers } = useController(props);

  return (
    <>
      <Head>
        <title>Lobito's Home Page</title>
        <meta name="description" content="Carlos Camilo Lobo's personal page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#0A0A0A]">
        <div id="portal-root" />

        <main className="h-screen overflow-hidden  max-w-[1440px] my-0 mx-auto bg-[url('../public/kaneki-looking-at-city.png')] bg-no-repeat bg-[left_2rem_top_50%]">
          <header className="p-8 h-20 flex items-center justify-start">
            <h1 className="font-bold select-none">
              <span className="text-4xl text-white text-bitwise">
                wolf@future_widget_lab
              </span>
            </h1>
          </header>

          <div className="flex flex-col gap-8  absolute top-2/4 left-2/4 -translate-y-2/4">
            <h2 className="text-white flex flex-col text-center">
              <span className="text-[100px] text-honoka-shin-antique">
                “<span className="italic">はじめまして</span>”
              </span>
              <span className="text-bitwise text-4xl ">
                💬 (Nice to meet you)
              </span>
            </h2>

            <section className="pr-8 pl-8 flex justify-center">
              <ul className="flex flex-row gap-4">
                <li className="w-32">
                  <DesktopIconButton
                    variant="file"
                    filename="profile.md"
                    onDoubleClick={handlers.openFile}
                    onKeyPress={handlers.openFileByPressingEnter}
                  />
                </li>
                <li className="w-32">
                  <DesktopIconButton
                    variant="directory"
                    filename="experience"
                    onDoubleClick={handlers.openFile}
                    onKeyPress={handlers.openFileByPressingEnter}
                  />
                </li>
                <li className="w-32">
                  <DesktopIconButton
                    variant="file"
                    filename="functions.md"
                    onDoubleClick={handlers.openFile}
                    onKeyPress={handlers.openFileByPressingEnter}
                  />
                </li>
                <li className="w-32">
                  <DesktopIconButton
                    variant="file"
                    filename="social_media.md"
                    onDoubleClick={handlers.openFile}
                    onKeyPress={handlers.openFileByPressingEnter}
                  />
                </li>
              </ul>
            </section>
          </div>

          {computed.processes.map((process) => (
            <FileWindow
              key={process.processId}
              process={process.reference}
              order={process.order}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export { HomePage };
