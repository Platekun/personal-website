import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createSocialMediaContent } from 'transformers/resume-social-media.transformer';

function useController(props) {
  const content = useTransformer(props.socialMedia, createSocialMediaContent);

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
