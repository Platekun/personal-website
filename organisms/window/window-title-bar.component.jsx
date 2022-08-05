import Image from 'next/image';
import classes from 'classnames';

import closeIcon from '../../public/close-icon.svg';
import { useWindow } from './window.component';

function WindowTitleBar(props) {
  const { title, children } = props;

  const { isIdle, isDragging, isActive, onWindowDragged, onWindowClosed } =
    useWindow();

  return (
    <header
      className={classes(
        'sticky top-0 h-8 w-full flex items-center justify-center bg-[#219AD6] border-b-2 border-[#219AD6] border-double rounded-tr-lg z-[2]',
        {
          'cursor-grab': isIdle,
          'cursor-grabbing': isDragging,
          'cursor-pointer': !isActive,
        }
      )}
      onMouseDown={onWindowDragged}
    >
      <div className="absolute left-2">
        <button
          className={classes('pt-2 p-1 select-none', {
            'pointer-events-none': !isActive,
          })}
          onClick={onWindowClosed}
        >
          <Image
            src={closeIcon}
            alt={`Close button for ${title}.`}
            title="Close this window by clicking on this button."
            height={16}
            width={16}
          />
        </button>
      </div>

      <span className="text-[#091432] font-bold italic text-bitwise text-lg">
        {title.toUpperCase()}
      </span>

      {children}
    </header>
  );
}

export { WindowTitleBar };
