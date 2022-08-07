import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformSocialMediaToContent } from 'transformers/resume-social-media.transformer';

function useController(props) {
  const content = useTransformer(
    props.socialMediaCollection,
    transformSocialMediaToContent
  );

  useMobileOnlyGuard();

  return {
    refs: {},
    computed: {
      content,
    },
    data: {},
    handlers: {},
  };
}

export { useController };
