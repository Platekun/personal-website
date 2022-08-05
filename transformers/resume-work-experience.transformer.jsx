import Image from 'next/image';
import classes from 'classnames';

const MonthNamesMap = {
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

function createExperienceContent(workExperience) {
  return (
    <>
      <h2
        className={classes(
          'text-3xl text-[#0AC9EE] text-bitwise',
          'sm:text-4xl'
        )}
      >
        {workExperience.jobTitle.join(' / ')}
      </h2>
      <p
        className={classes(
          'text-base text-noto-sans text-white',
          'sm:text-xl',
          'lg:text-2xl'
        )}
      >
        Company Name: {workExperience.employer}.
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
          href={workExperience.employerUrl}
          target="_blank"
          className={classes(
            'text-base text-noto-sans text-[#0AC9EE]',
            'sm:text-xl',
            'lg:text-2xl'
          )}
          style={{ textDecoration: 'underline' }}
        >
          {workExperience.employerUrl}
        </a>
      </p>
      <p
        className={classes(
          'text-base text-noto-sans text-white',
          'sm:text-xl',
          'lg:text-2xl'
        )}
      >
        Employment period: {MonthNamesMap[workExperience.from.month]}{' '}
        {workExperience.from.year} - {MonthNamesMap[workExperience.to.month]}{' '}
        {workExperience.to.year}.
      </p>
      <ul className={classes('flex flex-row justify-center flex-wrap gap-4')}>
        {workExperience.images.map((img) => (
          <li key={img.source}>
            <a href={img.source} target="_blank">
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  borderColor: '#0AC9EE',
                  borderStyle: 'double',
                  borderWidth: 4,
                  width: 340,
                  height: 191,
                }}
              >
                <Image
                  src={img.source}
                  alt={img.alt}
                  title={img.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      {workExperience.description.map((line) => (
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

export { createExperienceContent };
