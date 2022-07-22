import classes from 'classnames';
import { createContext, useContext } from 'react';

import { useController } from './window.controller';

const WindowContext = createContext(null);

function useWindow() {
  return useContext(WindowContext);
}

function Window(props) {
  const { children } = props;
  const { data, computed, handlers } = useController(props);

  return (
    <section
      id={computed.windowId}
      className={classes(
        'resize overflow-scroll absolute rounded-sm bg-[#0A0A0A] border-2 border-white border-solid max-w-100',
        {
          'select-none': data.allowMouseSelection ? 'true' : 'false',
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
      <WindowContext.Provider
        value={{
          isIdle: computed.isIdle,
          isDragging: computed.isDragging,
          onWindowDragged: handlers.dragWindow,
          onWindowClosed: handlers.closeWindow,
        }}
      >
        {children}
      </WindowContext.Provider>
    </section>
  );
}

export { Window, useWindow };
