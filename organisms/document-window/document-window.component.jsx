import { createPortal } from 'react-dom';
import Image from 'next/image';

import { Window, WindowTitleBar } from '../window';
import lockedIcon from 'public/lock-icon.svg';
import unlockedIcon from 'public/unlock-icon.svg';

import { useController } from './document-window.controller';

function DocumentWindow(props) {
  const { data, computed, handlers } = useController(props);

  return createPortal(
    <Window
      proccessId={data.processId}
      dimensions={data.dimensions}
      order={data.order}
      isActive={data.isActive}
      onSelected={handlers.selectWindow}
      onClosed={handlers.terminateProccess}
      isSelectionEnabled={!computed.isDragging}
    >
      <WindowTitleBar title={data.title}>
        <div className="absolute right-2">
          {!computed.isEditing ? (
            <button className="pt-2 p-1" onClick={handlers.toggleEdition}>
              <Image
                src={lockedIcon}
                alt={`Enable selection for ${data.title}.`}
                title="Enable selection for this document by clicking on this button."
                height={24}
                width={24}
              />
            </button>
          ) : (
            <button className="pt-2 p-1" onClick={handlers.toggleEdition}>
              <Image
                src={unlockedIcon}
                alt={`Disable selection for ${data.title}.`}
                title="Disable selection for this document by clicking on this button."
                height={24}
                width={24}
              />
            </button>
          )}
        </div>
      </WindowTitleBar>

      <div
        className="p-6 pb-14 flex flex-col gap-6 text-xl h-full overflow-scroll"
        contentEditable={computed.isEditing ? 'true' : 'false'}
        suppressContentEditableWarning={true}
      >
        {data.content}
      </div>
    </Window>,
    document.getElementById('portal-root')
  );
}

export { DocumentWindow };
