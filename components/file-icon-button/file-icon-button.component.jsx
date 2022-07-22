import Image from 'next/image';

import documentIcon from '../../public/file-icon.svg';
import directoryIcon from '../../public/directory-icon.svg';

function FileIconButton(props) {
  const { variant = 'document', filename, fileId, ...rest } = props;

  const source =
    variant === 'document'
      ? documentIcon
      : variant === 'directory'
      ? directoryIcon
      : null;

  return (
    <button
      className="w-32 flex flex-col justify-center items-center w-100 p-1 pt-3 rounded-sm select-none transition hover:bg-slate-700 focus:bg-slate-800 active:bg-slate-900"
      data-file-id={fileId}
      {...rest}
    >
      <Image
        src={source}
        alt={`${filename} ${variant} icon`}
        title={`Open this ${variant} by double clicking or by focussing and pressing Enter.`}
        height={67}
        width={67}
      />
      <h3 className="mt-2">
        <span className="text-white text-md text-center text-bitwise">
          {filename}
        </span>
      </h3>
    </button>
  );
}

export { FileIconButton };
