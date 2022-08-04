import Link from 'next/link';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './ticom-sa-page.controller';

function TicomSaPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In TICOM S.A"
        description="This is Carlos Camilo Lobo's work experience while working for TICOM S.A"
      />

      <main
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <div className={classes('w-full flex flex-col gap-6 p-4', 'sm:px-8')}>
          {computed.content}

          <Link href="/experience/nativapps.md">
            <a className={classes('text-white text-left text-bitwise')}>
              ⬅️ Recent
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}

export { TicomSaPageTemplate };
