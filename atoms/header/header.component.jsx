import Link from 'next/link';
import classes from 'classnames';

const HEADER_TEXT = 'Future Widget Lab';

function Header(props) {
  const {
    asLink = true,
    animate = false,
    animationDelay,
    style,
    ...rest
  } = props;

  return (
    <header
      className={classes(
        'w-full p-4',
        'sm:px-8 sm:h-20 sm:flex sm:items-center sm:justify-start',
        {
          'opacity-0 animate-fade-in': animate,
        }
      )}
      style={{
        ...style,
        animationDelay,
      }}
      {...rest}
    >
      <h1 className="font-bold select-none">
        <span
          className={classes('text-xl text-white text-bitwise', 'sm:text-4xl')}
        >
          {asLink ? (
            <Link href="/">
              <a>{HEADER_TEXT}</a>
            </Link>
          ) : (
            HEADER_TEXT
          )}
        </span>
      </h1>
    </header>
  );
}

export { Header };
