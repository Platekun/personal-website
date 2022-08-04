import { Resume } from 'db/resume';
import { performSsrMobileCheck } from 'utils/performSsrMobileCheck';
import { computeIsMobileSsr } from 'utils/computeIsMobileSsr';
import { isSsr } from 'utils/isSsr';
import { withPageProps } from 'hooks/usePageProps.hook';
import TicomSaPageTemplate from 'templates/ticom-sa-page';

export default withPageProps(TicomSaPageTemplate);

export function getServerSideProps(context) {
  const { req: request, res: response } = context;

  performSsrMobileCheck({ request, response });

  const ssr = isSsr();

  const isMobileSsr = computeIsMobileSsr(request);

  return {
    props: {
      ssr,
      isMobileSsr,
      experience: Resume.experience[0],
    },
  };
}
