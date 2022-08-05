import classes from 'classnames';

function createSocialMediaContent(socialMedia) {
  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        Social Media
      </h2>
      <ul className="flex flex-col gap-4">
        {Object.entries(socialMedia).map(([name, url]) => (
          <li key={url}>
            <p
              className={classes(
                'text-base text-noto-sans',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              <span className="text-white">* {name}: </span>
              <a
                href={url}
                target="_blank"
                className="text-[#0AC9EE] sm:text-2xl"
                style={{ textDecoration: 'underline' }}
              >
                {url}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export { createSocialMediaContent };
