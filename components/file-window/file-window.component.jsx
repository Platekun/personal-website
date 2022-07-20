import { createPortal } from 'react-dom';
import Image from 'next/image';
import classes from 'classnames';

import { useController } from './file-window.controller';
import closeIcon from '../../public/close-icon.svg';
import editIcon from '../../public/edit-icon.svg';
import saveIcon from '../../public/save-icon.svg';

function FileWindow(props) {
  const { refs, data, computed, handlers } = useController(props);

  return createPortal(
    <section
      id={computed.windowId}
      className={classes(
        'resize overflow-scroll absolute rounded-sm bg-black border-2 border-white border-solid min-w-[30%] max-w-100',
        {
          'select-none': computed.isEditing ? 'true' : 'false',
        }
      )}
      style={{
        position: 'absolute',
        transform: `translate(calc(${
          data.anchor.x + data.delta.dx
        } * 1px), calc(${data.anchor.y + data.delta.dy} * 1px))`,
        width: data.dimensions.width,
        height: data.dimensions.height,
        zIndex: data.order,
      }}
      onMouseDown={handlers.selectWindow}
    >
      <header
        ref={refs.appBarReference}
        className={classes(
          'sticky top-0 h-8 w-full bg-white flex items-center justify-center border-sm border-2 border-black',
          {
            'cursor-grab': computed.isIdle,
            'cursor-grabbing': computed.isDragging,
          }
        )}
        onMouseDown={handlers.dragWindow}
      >
        <div className="absolute left-2">
          <button className="p-1 select-none" onClick={handlers.closeWindow}>
            <Image src={closeIcon} height={12} width={12} />
          </button>
        </div>
        <span className="text-black font-bold text-terminal text-xl">
          {data.title}
        </span>
        <div className="absolute right-2">
          {!computed.isEditing ? (
            <button className="p-1" onClick={handlers.toggleEdition}>
              <Image src={editIcon} height={12} width={12} />
            </button>
          ) : (
            <button className="p-1" onClick={handlers.toggleEdition}>
              <Image src={saveIcon} height={12} width={12} />
            </button>
          )}
        </div>
      </header>

      <pre
        className="whitespace-pre-line h-full"
        contentEditable={computed.isEditing ? 'true' : 'false'}
        suppressContentEditableWarning={true}
      >
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="p-6 text-white text-terminal text-2xl"
        />
      </pre>
    </section>,
    document.getElementById('portal-root')
  );
}

export { FileWindow };
