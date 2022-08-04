import { createContext, useContext } from 'react';
import classes from 'classnames';

import { useController } from './window.controller';

const WindowContext = createContext(null);

function useWindow() {
  return useContext(WindowContext);
}

function Window(props) {
  const { children } = props;
  const { refs, data, computed, handlers } = useController(props);

  return (
    <section
      ref={refs.sectionReference}
      id={computed.windowId}
      className={classes(
        'resize overflow-hidden absolute rounded-sm bg-[#091432] opacity-90 border-4 rounded-tr-3xl rounded-bl-3xl border-[#0AC9EE] border-double max-w-100',
        'opacity-0 animate-pop-and-fade',
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
