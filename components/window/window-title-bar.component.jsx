import Image from 'next/image';
import classes from 'classnames';

import closeIcon from '../../public/close-icon.svg';
import { useWindow } from './window.component';

function WindowTitleBar(props) {
  const { title, children } = props;

  const { isIdle, isDragging, onWindowDragged, onWindowClosed } = useWindow();

  return (
    <header
      className={classes(
        'sticky top-0 h-8 w-full bg-white flex items-center justify-center border-sm border-2 border-black z-[2]',
        {
          'cursor-grab': isIdle,
          'cursor-grabbing': isDragging,
        }
      )}
      onMouseDown={onWindowDragged}
    >
      <div className="absolute left-2">
        <button className="p-1 select-none" onClick={onWindowClosed}>
          <Image
            src={closeIcon}
            alt={`Close button for ${title}.`}
            title="Close this window by clicking on this button."
            height={12}
            width={12}
          />
        </button>
      </div>

      <span className="text-black font-bold text-bitwise text-lg">
        {title.toUpperCase()}
      </span>

      {children}
    </header>
  );
}

export { WindowTitleBar };
