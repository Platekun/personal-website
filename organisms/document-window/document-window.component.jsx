import { createPortal } from 'react-dom';
import Image from 'next/image';

import { Window, WindowTitleBar } from '../window';
import editIcon from 'public/edit-icon.svg';
import saveIcon from 'public/save-icon.svg';
import { useController } from './document-window.controller';

function DocumentWindow(props) {
  const { data, computed, handlers } = useController(props);

  return createPortal(
    <Window
      proccessId={data.processId}
      dimensions={data.dimensions}
      order={data.order}
      onSelected={handlers.selectWindow}
      onClosed={handlers.terminateProccess}
      allowMouseSelection={!computed.isDragging}
    >
      <WindowTitleBar title={data.title}>
        <div className="absolute right-2">
          {!computed.isEditing ? (
            <button className="p-1" onClick={handlers.toggleEdition}>
              <Image
                src={editIcon}
                alt={`Enable edition button for ${data.title}.`}
                title="Enable the edition mode of this document by clicking on this button."
                height={12}
                width={12}
              />
            </button>
          ) : (
            <button className="p-1" onClick={handlers.toggleEdition}>
              <Image
                src={saveIcon}
                alt={`Disable edition button for ${data.title}.`}
                title="Disable the edition mode of this document by clicking on this button."
                height={12}
                width={12}
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
