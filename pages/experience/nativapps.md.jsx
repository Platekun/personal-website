import { Resume } from 'db/resume';
import { performSsrMobileCheck } from 'utils/performSsrMobileCheck';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import NativAppsPageTemplate from 'templates/nativapps-page';

export default withPageProps(NativAppsPageTemplate);

export function getServerSideProps(context) {
  const { req: request, res: response } = context;

  performSsrMobileCheck({ request, response });

  const ssr = isSsr();

  const ssrIsMobile = computeIsMobileSsr(request);

  return {
    props: {
      ssr,
      ssrIsMobile,
      experience: Resume.experience[1],
    },
  };
}
