import Image from 'next/image';
import classes from 'classnames';

const MonthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

function transformWorkExperienceToContent(options) {
  const { workExperienceCollectionItem, imageModules } = options;

  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        {workExperienceCollectionItem.content.jobTitle.join(' / ')}
      </h2>
      <p
        className={classes(
          'text-base text-noto-sans text-white',
          'sm:text-xl',
          'lg:text-2xl'
        )}
      >
        Company Name: {workExperienceCollectionItem.content.employer}.
      </p>
      <p
        className={classes(
          'text-base text-noto-sans',
          'sm:text-xl',
          'lg:text-2xl'
        )}
      >
        <span className="text-white">Company URL: </span>
        <a
          href={workExperienceCollectionItem.content.employerUrl}
          target="_blank"
          className={classes(
            'text-base text-noto-sans text-[#0AC9EE]',
            'sm:text-xl',
            'lg:text-2xl'
          )}
          style={{ textDecoration: 'underline' }}
        >
          {workExperienceCollectionItem.content.employerUrl}
        </a>
      </p>
      <p
        className={classes(
          'text-base text-noto-sans text-white',
          'sm:text-xl',
          'lg:text-2xl'
        )}
      >
        Employment period:{' '}
        {MonthNames[workExperienceCollectionItem.content.from.month]}{' '}
        {workExperienceCollectionItem.content.from.year} -{' '}
        {MonthNames[workExperienceCollectionItem.content.to.month]}{' '}
        {workExperienceCollectionItem.content.to.year}.
      </p>
      <ul className={classes('flex flex-row justify-center flex-wrap gap-4')}>
        {imageModules.map((module) => (
          <li key={module.image.src}>
            <a href={module.image.src} target="_blank">
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  borderColor: '#0AC9EE',
                  borderStyle: 'double',
                  borderWidth: 4,
                  width: 288,
                  height: 162,
                }}
              >
                <Image
                  src={module.image}
                  alt={module.alt}
                  title={module.alt}
                  layout="fill"
                  objectFit="cover"
                  res
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      {workExperienceCollectionItem.content.description.map((line) => (
        <p
          key={line}
          className={classes(
            'text-base w-full align-left text-noto-sans text-white',
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

export { transformWorkExperienceToContent };
