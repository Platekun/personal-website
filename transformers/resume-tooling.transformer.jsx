import classes from 'classnames';

function transformToolingToContent(toolingCollection) {
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

      {toolingCollection.collection.map((toolingCollectionItem) => (
        <p
          key={toolingCollectionItem.id}
          className={classes(
            'text-base text-noto-sans',
            'sm:text-xl',
            'lg:text-2xl'
          )}
        >
          <span className="text-white">*</span>{' '}
          <a
            key={toolingCollectionItem.id}
            href={toolingCollectionItem.source}
            target="_blank"
            className={classes(
              'text-[#0AC9EE] text-base',
              'sm:text-xl',
              'lg:text-2xl'
            )}
            style={{ textDecoration: 'underline' }}
          >
            {toolingCollectionItem.content.name}
          </a>
          <span className="text-white">
            : {toolingCollectionItem.content.description}
          </span>
        </p>
      ))}
    </>
  );
}

export { transformToolingToContent };
