import { createPortal } from 'react-dom';
import classes from 'classnames';

import FileIconButton from '../file-icon-button';
import { Window, WindowTitleBar } from '../window';
import { useController } from './directory-window.controller';

function DirectoryWindow(props) {
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
      <WindowTitleBar title={data.title} />

      <ul className="p-4 flex flex-row flex-wrap gap-4">
        {computed.contents.map((fileOrDirectory, index) => (
          <li
            key={fileOrDirectory.fileId}
            className={classes('w-24', 'sm:w-32')}
          >
            <FileIconButton
              variant={fileOrDirectory.contentType}
              fileId={fileOrDirectory.fileId}
              filename={fileOrDirectory.filename}
              onDoubleClick={handlers.openFile}
              onKeyPress={handlers.openFileByPressingEnter}
              animate={true}
              animationDelay={`${index / 5}s`}
            />
          </li>
        ))}
      </ul>
    </Window>,
    document.getElementById('portal-root')
  );
}

export { DirectoryWindow };