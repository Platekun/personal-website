import { useRedirectOnDesktop } from 'hooks/useRedirectOnDesktop.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createExperienceContent } from 'transformers/resume-work-experience.transformer';

function useController(props) {
  const content = useTransformer(props.experience, createExperienceContent);

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
