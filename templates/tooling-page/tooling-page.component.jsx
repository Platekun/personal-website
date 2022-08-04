import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './tooling-page.controller';

function ToolingPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Toolset"
        description="These are the technologies Carlos Lobo usually applies in his job as a software developer"
      />

      <main
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <section
          className={classes(
            'w-full flex flex-col gap-6 p-4 text-xl',
            'sm:px-8 sm:text-2xl'
          )}
        >
          {computed.content}
        </section>
      </main>
    </>
  );
}

export { ToolingPageTemplate };
