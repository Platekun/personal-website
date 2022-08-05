import classes from 'classnames';

function createFunctionsContent(functions) {
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
        {functions.map((func) => (
          <li key={func.description}>
            <p
              className={classes(
                'text-base text-noto-sans text-white',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              * {func.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export { createFunctionsContent };
