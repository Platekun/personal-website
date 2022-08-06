import { useRef } from 'react';
import Image from 'next/image';
import classes from 'classnames';
import Link from 'next/link';
import { useButton } from 'react-aria';

import documentIcon from 'public/file-icon.svg';
import directoryIcon from 'public/directory-icon.svg';
import { useCssAnimationCleanup } from 'hooks/useCssAnimationCleanup.hook';

function FileIconButton(props) {
  const {
    variant = 'document',
    filename,
    entryFilename,
    fileId,
    onDoubleClick,
    onKeyPress,
    animate,
    animationDelay,
  } = props;

  const reference = useRef(null);
  const { buttonProps } = useButton({ onKeyDown: onKeyPress }, reference);

  useCssAnimationCleanup(reference, [
    'opacity-0',
    'animate-fade-in',
    'pointer-events-none',
  ]);

  const iconElementClasses = classes(
    'w-full flex flex-col justify-center items-center p-1 pt-3 rounded-sm select-none transition hover:bg-sky-700 focus:bg-sky-800 active:bg-[#0AC9EE]',
    {
      'animate-fade-in opacity-0 pointer-events-none': animate,
    }
  );

  const iconElementStyles = animate ? { animationDelay } : {};

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
        className={iconElementClasses}
        style={iconElementStyles}
      >
        <Image
          src={source}
          alt={`${filename} ${variant} icon`}
          height={67}
          width={67}
        />
        <h3 className="mt-2">
          <span
            className={classes(
              'text-md text-white text-shadow text-center text-noto-sans text-xs',
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
      className={iconElementClasses}
      data-file-id={fileId}
      title={`Open this ${variant} by double clicking or by focussing and pressing ↵ (Return).`}
      onDoubleClick={onDoubleClick}
      style={iconElementStyles}
      {...buttonProps}
    >
      <Image
        src={source}
        alt={`${filename} ${variant} icon`}
        height={67}
        width={67}
      />
      <h3 className="mt-2">
        <span
          className={classes(
            'text-md text-white text-center text-noto-sans text-xs',
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
