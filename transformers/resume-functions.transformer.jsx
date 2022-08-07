import classes from 'classnames';

function transformRoleFunctionsToContent(functionsCollection) {
  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        What I Do
      </h2>
      <ul className="flex flex-col gap-4">
        {functionsCollection.collection.map((functionsCollectionItem) => (
          <li key={functionsCollectionItem.id}>
            <p
              className={classes(
                'text-base text-noto-sans text-white',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              * {functionsCollectionItem.content.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export { transformRoleFunctionsToContent };
