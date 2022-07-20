import Image from 'next/image';

import fileIcon from '../../public/file-icon.svg';
import directoryIcon from '../../public/directory-icon.svg';

function DesktopIconButton(props) {
  const { variant = 'file', filename, directoryName, ...rest } = props;

  const source =
    variant === 'file'
      ? fileIcon
      : variant === 'directory'
      ? directoryIcon
      : null;

  return (
    <button
      className="w-full flex flex-col justify-center items-center w-100 p-1 pt-3 rounded-sm select-none transition hover:bg-slate-700 focus:bg-slate-800 active:bg-slate-900"
      data-filename={filename}
      data-directory-name={directoryName}
      {...rest}
    >
      <Image src={source} height={67} width={67} />
      <h3 className="mt-2">
        <span className="text-white text-md text-center text-bitwise">
          {filename}
        </span>
      </h3>
    </button>
  );
}

export { DesktopIconButton };
