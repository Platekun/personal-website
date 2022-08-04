import classes from 'classnames';

import Head from 'atoms/head';
import Header from 'atoms/header';
import { useController } from './social-media-page.controller';

function SocialMediaPageTemplate(props) {
  const { computed } = useController(props);

  return (
    <>
      <Head
        title="Carlos Lobo's Social Media"
        description="Carlos Camilo Lobo's Role social media information"
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

export { SocialMediaPageTemplate };
