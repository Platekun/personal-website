import Link from 'next/link';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './nativapps-page.controller';

function NativAppsPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In NativApps"
        description="This is Carlos Camilo Lobo's work experience while working for NativApps"
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
            <Link href="/experience/ideaware.md">
              <a className={classes('text-white text-right text-bitwise')}>
                ⬅️ Recent
              </a>
            </Link>

            <Link href="/experience/ticom.sa.md">
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

export { NativAppsPageTemplate };
