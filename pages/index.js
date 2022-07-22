import { Resume } from '../db/resume';

export { default } from '../components/desktop';

export function getStaticProps() {
  return {
    props: Resume,
  };
}
