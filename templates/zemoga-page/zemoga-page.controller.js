import sonyCompetitionCenterImage from 'public/sony-competition-center.jpeg';
import sonyCompetitionCenterImageColombia from '/public/sony-competition-center-colombia.png';
import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';

const imageModules = [
  {
    image: sonyCompetitionCenterImage,
    alt: 'Sony Competition Center - previous experience for en-us',
  },
  {
    image: sonyCompetitionCenterImageColombia,
    alt: 'Sony Competition Center - recent user experience for es-co',
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
