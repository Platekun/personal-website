import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './functions-page.controller';

function FunctionsPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Functions"
        description="This is Carlos Camilo Lobo's professional profile"
      />

      <main
        className={classes(
          'flex flex-col items-center h-screen w-auto max-w-7xl mx-auto'
        )}
      >
        <Header />

        <div className={classes('w-full flex flex-col gap-6 p-4', 'sm:px-8')}>
          {computed.content}
        </div>
      </main>
    </>
  );
}

export { FunctionsPageTemplate };
