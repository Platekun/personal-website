import NextHead from 'next/head';

function Head(props) {
  const { title, description } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}

export { Head };
