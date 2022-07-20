import classes from 'classnames';

function Window(props) {
  const {
    windowId,
    children,
    editable = false,
    dimensions,
    anchor,
    delta,
    order,
    onSelected,
    ...rest
  } = props;

  return (
    <section
      id={windowId}
      className={classes(
        'resize overflow-scroll absolute rounded-sm bg-black border-2 border-white border-solid min-w-[30%] max-w-100',
        {
          'select-none': editable ? 'true' : 'false',
        }
      )}
      style={{
        position: 'absolute',
        transform: `translate(calc(${anchor.x + delta.dx} * 1px), calc(${
          anchor.y + delta.dy
        } * 1px))`,
        width: dimensions.width,
        height: dimensions.height,
        zIndex: order,
      }}
      onMouseDown={onSelected}
      {...rest}
    >
      {children}
    </section>
  );
}

export { Window };
