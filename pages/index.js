import { Resume } from '../db/resume';
export { default } from '../components/home-page';

export function getStaticProps() {
  return {
    props: Resume,
  };
}
