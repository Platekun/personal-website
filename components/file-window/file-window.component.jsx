import { createPortal } from 'react-dom';
import Image from 'next/image';

import Window from '../window';
import WindowTitleBar from '../window-title-bar';
import editIcon from '../../public/edit-icon.svg';
import saveIcon from '../../public/save-icon.svg';
import { useController } from './file-window.controller';

function FileWindow(props) {
  const { refs, data, computed, handlers } = useController(props);

  return createPortal(
    <Window
      windowId={computed.windowId}
      dimensions={data.dimensions}
      anchor={data.anchor}
      delta={data.delta}
      order={data.order}
      onSelected={handlers.selectWindow}
    >
      <WindowTitleBar
        reference={refs.appBarReference}
        title={data.title}
        isIdle={computed.isIdle}
        isDragging={computed.isDragging}
        onWindowDragged={handlers.dragWindow}
        onWindowClosed={handlers.closeWindow}
      >
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
      </WindowTitleBar>

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
    </Window>,
    document.getElementById('portal-root')
  );
}

export { FileWindow };
