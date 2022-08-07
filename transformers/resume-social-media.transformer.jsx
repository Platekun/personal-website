import classes from 'classnames';

function transformSocialMediaToContent(socialMediaCollection) {
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
        {socialMediaCollection.collection.map((socialMediaCollectionItem) => (
          <li key={socialMediaCollectionItem.id}>
            <p
              className={classes(
                'text-base text-noto-sans',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              <span className="text-white">
                * {socialMediaCollectionItem.content.name}:{' '}
              </span>
              <a
                href={socialMediaCollectionItem.content.socialMediaUrl}
                target="_blank"
                className="text-[#0AC9EE] sm:text-2xl"
                style={{ textDecoration: 'underline' }}
              >
                {socialMediaCollectionItem.content.socialMediaUrl}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export { transformSocialMediaToContent };
