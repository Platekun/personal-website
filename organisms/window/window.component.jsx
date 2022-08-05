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
        'resize overflow-hidden absolute rounded-sm bg-[#091432] opacity-0 border-4 rounded-tr-3xl rounded-bl-3xl border-[#0AC9EE] border-double min-w-[30em] max-w-100',
        {
          'select-none': !data.isSelectionEnabled ? 'false' : 'true',
        }
      )}
      style={{
        // To avoid jumping between different coordinates, the `setup` phase uses the final coordinates of the animation.
        transform: `translate(calc(${
          data.anchor.x + data.delta.dx
        } * 1px), calc(${data.anchor.y + data.delta.dy} * 1px))`,
        width: data.dimensions.width,
        height: data.dimensions.height,
        zIndex: data.order,
        filter: data.isActive ? 'brightness(1)' : 'brightness(0.5)',
      }}
      onMouseDown={handlers.selectWindow}
    >
      <WindowContext.Provider
        value={{
          isIdle: computed.isIdle,
          isDragging: computed.isDragging,
          isActive: data.isActive,
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
