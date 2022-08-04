import Link from 'next/link';
import classes from 'classnames';

function Header(props) {
  const { animate = false, animationDelay, style, ...rest } = props;

  return (
    <header
      className={classes(
        'w-full p-4',
        'sm:px-8 sm:h-20 sm:flex sm:items-center sm:justify-start',
        {
          'opacity-0 animate-fade-in-downwards': animate,
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
          <Link href="/">
            <a>Future Widget Lab</a>
          </Link>
        </span>
      </h1>
    </header>
  );
}

export { Header };
