import { findResumeByVersion } from 'data/resume';
import { performSsrMobileCheck } from 'utils/performSsrMobileCheck';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import ToolingPageTemplate from 'templates/tooling-page';

export default withPageProps(ToolingPageTemplate);

export function getServerSideProps(context) {
  const { req: request, res: response } = context;

  performSsrMobileCheck({ request, response });

  const ssr = isSsr();

  const ssrIsMobile = computeIsMobileSsr(request);

  const resume = findResumeByVersion('alpha');

  return {
    props: {
      ssr,
      ssrIsMobile,
      toolingCollection: resume.toolingCollection,
    },
  };
}
