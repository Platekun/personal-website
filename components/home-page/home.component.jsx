import Head from 'next/head';
import Image from 'next/image';

import fileIcon from '../../public/file-icon.svg';
import directoryIcon from '../../public/directory-icon.svg';
import { useController } from './home.controller';
import FileWindow from '../file-window';

function WindowIconButton(props) {
  const {
    variant = 'file',
    filename,
    directoryName,
    onDoubleClick,
    onKeyPress,
  } = props;

  const iconSource =
    variant === 'file'
      ? fileIcon
      : variant === 'directory'
      ? directoryIcon
      : null;

  return (
    <button
      data-filename={filename}
      data-directory-name={directoryName}
      onDoubleClick={onDoubleClick}
      onKeyPress={onKeyPress}
      className="w-full flex flex-col justify-center items-center w-100 p-1 pt-3 rounded-sm select-none transition hover:bg-slate-700 focus:bg-slate-800 active:bg-slate-900"
    >
      <Image src={iconSource} height={67} width={67} />
      <h3>
        <span className="text-white text-xl text-center text-terminal">
          {filename}
        </span>
      </h3>
    </button>
  );
}

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
                <WindowIconButton
                  variant="file"
                  filename="profile.txt"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <WindowIconButton
                  variant="directory"
                  filename="experience"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <WindowIconButton
                  variant="file"
                  filename="functions.txt"
                  onDoubleClick={handlers.openFile}
                  onKeyPress={handlers.openFileByPressingEnter}
                />
              </li>
              <li className="w-full">
                <WindowIconButton
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
