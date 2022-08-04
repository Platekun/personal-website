import classes from 'classnames';

function createToolingContent(tooling) {
  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        Toolset
      </h2>

      {tooling.map((tool) => (
        <p className={classes('text-xl text-inconsolata', 'sm:text-2xl')}>
          <span className="text-white">*</span>{' '}
          <a
            key={tool.name}
            href={tool.source}
            target="_blank"
            className="text-[#0AC9EE] sm:text-2xl"
            style={{ textDecoration: 'underline' }}
          >
            {tool.name}
          </a>
          : <span className="text-white">{tool.description}</span>
        </p>
      ))}
    </>
  );
}

export { createToolingContent };
