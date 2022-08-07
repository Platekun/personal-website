import { findResumeByVersion } from 'data/resume';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import HomePageTemplate from 'templates/home-page';

export default withPageProps(HomePageTemplate);

export function getServerSideProps(context) {
  const { req: request } = context;

  const ssr = isSsr();

  const ssrIsMobile = computeIsMobileSsr(request);

  const resume = findResumeByVersion('alpha');

  return {
    props: {
      ssr,
      ssrIsMobile,
      resume: resume,
    },
  };
}
