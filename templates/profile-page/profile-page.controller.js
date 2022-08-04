import { useRedirectOnDesktop } from 'hooks/useRedirectOnDesktop.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createProfileContent } from 'transformers/resume-profile.transformer';

function useController(props) {
  const content = useTransformer(props.profile, createProfileContent);

  useRedirectOnDesktop();

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
