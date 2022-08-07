import beGirl1 from 'public/be-girl-app-1.jpeg';
import beGirl2 from 'public/be-girl-app-2.jpeg';
import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';

const imageModules = [
  {
    image: beGirl1,
    alt: 'BeGirl application ovulation tracking',
  },
  {
    image: beGirl2,
    alt: 'BeGirl application ovulation calendar',
  },
];

function useController(props) {
  const { workExperienceCollectionItem } = props;

  const content = useTransformer(
    { workExperienceCollectionItem, imageModules },
    transformWorkExperienceToContent
  );

  useMobileOnlyGuard();

  return {
    refs: {},
    data: {},
    computed: {
      content,
    },
    handlers: {},
  };
}

export { useController };
