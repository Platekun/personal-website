import { Resume } from 'db/resume';
import { performSsrMobileCheck } from 'utils/performSsrMobileCheck';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import ProfilePageTemplate from 'templates/profile-page';

export default withPageProps(ProfilePageTemplate);

export function getServerSideProps(context) {
  const { req: request, res: response } = context;

  performSsrMobileCheck({ request, response });

  const ssr = isSsr();

  const ssrIsMobile = computeIsMobileSsr(request);

  return {
    props: {
      ssr,
      ssrIsMobile,
      profile: Resume.profile,
    },
  };
}
