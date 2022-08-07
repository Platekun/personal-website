import lunaCareIntakeForm from 'public/luna-intake-form-first-part.png';
import lunaCareCredentialingForm from 'public/luna-care-credentialing-form.png';
import lunaCareDashboard from 'public/luna-dashboard.png';
import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';

const imageModules = [
  {
    image: lunaCareIntakeForm,
    alt: 'LunaCare intake form first screen',
  },
  {
    image: lunaCareCredentialingForm,
    alt: 'LunaCare credentialing form example screen',
  },
  {
    image: lunaCareDashboard,
    alt: 'LunaCare credentialing dashboard example',
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
