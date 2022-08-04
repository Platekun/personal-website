import Link from 'next/link';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './ideaware-page.controller';

function IdeawarePageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In Ideaware"
        description="This is Carlos Camilo Lobo's work experience while working for Ideaware"
      />

      <main
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <div className={classes('w-full flex flex-col gap-6 p-4', 'sm:px-8')}>
          {computed.content}

          <div className="flex justify-between">
            <Link href="/experience/zemoga.md">
              <a className={classes('text-white text-right text-bitwise')}>
                ⬅️ Recent
              </a>
            </Link>

            <Link href="/experience/nativapps.md">
              <a className={classes('text-white text-right text-bitwise')}>
                Older ➡️
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export { IdeawarePageTemplate };
