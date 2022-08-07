import classes from 'classnames';

function transformProfileToContent(profileRecord) {
  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        Professional Profile
      </h2>
      {profileRecord.content.map((line) => (
        <p
          key={line}
          className={classes(
            'text-base text-noto-sans text-white',
            'sm:text-xl',
            'lg:text-2xl'
          )}
        >
          {line}
        </p>
      ))}
    </>
  );
}

export { transformProfileToContent };
