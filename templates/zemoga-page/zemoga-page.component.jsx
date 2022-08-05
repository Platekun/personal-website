import Link from 'next/link';
import Image from 'next/image';
import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import arrowForwardIcon from 'public/arrow-forward-icon.svg';
import { useController } from './zemoga-page.controller';

function ZemogaPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Experience In Zemoga"
        description="This is Carlos Camilo Lobo's work experience while working for Zemoga"
      />

      <div
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <main
          className={classes(
            'w-full flex flex-col gap-6 pt-5 pl-5 pr-5 pb-0',
            'sm:px-8'
          )}
        >
          {computed.content}
        </main>

        <footer
          className={classes(
            'w-full flex flex-row-reverse pb-5 pl-5 pr-5 mt-8',
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
              <span className="mr-1 underline">Older</span>
              <Image src={arrowForwardIcon} width={24} height={24} />
            </a>
          </Link>
        </footer>
      </div>
    </>
  );
}

export { ZemogaPageTemplate };
