import { useRedirectOnDesktop } from 'hooks/useRedirectOnDesktop.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createSocialMediaContent } from 'transformers/resume-social-media.transformer';

function useController(props) {
  const content = useTransformer(props.socialMedia, createSocialMediaContent);

  useRedirectOnDesktop();

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
