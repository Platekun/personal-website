import Link from 'next/link';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './zemoga-page.controller';

function ZemogaPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In Zemoga"
        description="This is Carlos Camilo Lobo's work experience while working for Zemoga"
      />

      <main
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <div className={classes('w-full flex flex-col gap-6 p-5', 'sm:px-8')}>
          {computed.content}

          <Link href="/experience/ideaware.md">
            <a className={classes('text-white text-right text-bitwise')}>
              Older ➡️
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}

export { ZemogaPageTemplate };
