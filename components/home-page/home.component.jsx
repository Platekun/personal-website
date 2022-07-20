import Head from 'next/head';

import { useController } from './home.controller';
import FileWindow from '../file-window';
import DesktopIconButton from '../deskop-icon-button';

function HomePage(props) {
  const { computed, handlers } = useController(props);

  return (
    <div>
      <Head>
        <title>Lobito's Home Page</title>
        <meta name="description" content="Carlos Camilo Lobo's personal page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative overflow-hidden bg-black">
        <div id="portal-root" />

        <header className="p-8 h-20 flex items-center justify-start">
          <h1 className="font-bold select-none">
            <span className="text-4xl text-white text-terminal">LobitOS</span>{' '}
            <span className="text-base text-blue-700 text-terminal">(1.0)</span>
          </h1>
        </header>

        <div className="flex justify-end">
          <section className="pr-8 pl-8 max-w-xl flex">
            <ul className="grid grid-cols-2 gap-4">
              <li className="w-full">
                <DesktopIconButton
                  variant="file"
                  filename="profile.txt"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <DesktopIconButton
                  variant="directory"
                  filename="experience"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <DesktopIconButton
                  variant="file"
                  filename="functions.txt"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <DesktopIconButton
                  variant="file"
                  filename="social_media.txt"
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
  );
}

export { HomePage };
