import Link from 'next/link';
import Image from 'next/image';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import arrowForwardIcon from 'public/arrow-forward-outline.svg';
import arrowBackIcon from 'public/arrow-back-outline.svg';
import { useController } from './nativapps-page.controller';

function NativAppsPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In NativApps"
        description="This is Carlos Camilo Lobo's work experience while working for NativApps"
      />

      <div
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <main className={classes('w-full flex flex-col gap-6 p-4', 'sm:px-8')}>
          {computed.content}
        </main>

        <footer
          className={classes(
            'w-full flex justify-between pb-5 pl-5 pr-5 mt-8',
            'sm:mt-16',
            'lg:mt-24'
          )}
        >
          <Link href="/experience/ideaware.md">
            <a
              className={classes(
                'relative flex justify-center text-[#0AC9EE] text-right text-bitwise text-base',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              <Image src={arrowBackIcon} width={24} height={24} />
              <span className="ml-1 underline">Recent</span>
            </a>
          </Link>

          <Link href="/experience/ticom.sa.md">
            <a
              className={classes(
                'relative flex justify-center text-[#0AC9EE] text-right text-bitwise',
                'sm:text-xl',
                'lg:text-2xl'
              )}
            >
              <span className="mr-1 underline">Older</span>
              <Image src={arrowForwardIcon} width={24} height={24} />
            </a>
          </Link>
        </footer>
      </div>
    </>
  );
}

export { NativAppsPageTemplate };
