import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createExperienceContent } from 'transformers/resume-work-experience.transformer';

function useController(props) {
  const content = useTransformer(props.experience, createExperienceContent);

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
