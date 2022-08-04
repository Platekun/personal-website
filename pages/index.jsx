import { Resume } from 'db/resume';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import HomePageTemplate from 'templates/home-page';

export default withPageProps(HomePageTemplate);

export function getServerSideProps(context) {
  const { req: request } = context;

  const ssr = isSsr();

  const isMobileSsr = computeIsMobileSsr(request);

  return {
    props: {
      Resume,
      ssr,
      isMobileSsr,
    },
  };
}
