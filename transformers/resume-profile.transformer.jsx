import classes from 'classnames';

function createProfileContent(profile) {
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
      {profile.map((line) => (
        <p
          key={line}
          className={classes(
            'text-xl text-inconsolata text-white',
            'sm:text-2xl'
          )}
        >
          {line}
        </p>
      ))}
    </>
  );
}

export { createProfileContent };
