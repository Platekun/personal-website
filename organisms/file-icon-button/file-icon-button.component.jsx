import { useRef } from 'react';
import Image from 'next/image';
import classes from 'classnames';
import Link from 'next/link';

import documentIcon from 'public/file-icon.svg';
import directoryIcon from 'public/directory-icon.svg';
import { useRemoveClassesWhenAnimationEnds } from 'hooks/useRemoveClassesWhenAnimationEnds.hook';

function FileIconButton(props) {
  const {
    variant = 'document',
    filename,
    entryFilename,
    fileId,
    onDoubleClick,
    onKeyPress,
    style,
    animate,
    animationDelay,
  } = props;

  const reference = useRef(null);

  useRemoveClassesWhenAnimationEnds({
    reference,
    classes: ['opacity-0', 'animate-fade-in', 'pointer-events-none'],
  });

  const source =
    variant === 'document'
      ? documentIcon
      : variant === 'directory'
      ? directoryIcon
      : null;

  return !animate ? (
    <Link
      href={
        variant === 'document'
          ? `/${filename}`
          : `/${filename}/${entryFilename.toLowerCase()}`
      }
      data-file-id={fileId}
    >
      <a
        ref={reference}
        className={classes(
          'w-full flex flex-col justify-center items-center p-1 pt-3 rounded-sm select-none transition hover:bg-[#219AD6] focus:bg-[#219AD6] active:bg-[#219AD6]',
          {
            'animate-fade-in opacity-0 pointer-events-none': animate,
          }
        )}
        style={animate ? { animationDelay } : {}}
      >
        <Image
          src={source}
          alt={`${filename} ${variant} icon`}
          title={`Open this ${variant} by double clicking or by focussing and pressing Enter.`}
          height={67}
          width={67}
        />
        <h3 className="mt-2">
          <span
            className={classes(
              'text-md text-white text-center text-inconsolata text-xs',
              'sm:text-base'
            )}
          >
            {filename.toLowerCase()}
          </span>
        </h3>
      </a>
    </Link>
  ) : (
    <button
      ref={reference}
      className={classes(
        'w-full flex flex-col justify-center items-center p-1 pt-3 rounded-sm select-none transition  hover:bg-sky-700 focus:bg-sky-800 active:bg-[#0AC9EE]',
        {
          'animate-fade-in opacity-0 pointer-events-none': animate,
        }
      )}
      data-file-id={fileId}
      onDoubleClick={onDoubleClick}
      onKeyPress={onKeyPress}
      style={animate ? { animationDelay } : {}}
    >
      <Image
        src={source}
        alt={`${filename} ${variant} icon`}
        title={`Open this ${variant} by double clicking or by focussing and pressing Enter.`}
        height={67}
        width={67}
      />
      <h3 className="mt-2">
        <span
          className={classes(
            'text-md text-white text-center text-inconsolata text-xs',
            'sm:text-base'
          )}
        >
          {filename.toLowerCase()}
        </span>
      </h3>
    </button>
  );
}

export { FileIconButton };
