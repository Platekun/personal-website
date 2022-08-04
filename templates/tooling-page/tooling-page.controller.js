import { useRedirectOnDesktop } from 'hooks/useRedirectOnDesktop.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createToolingContent } from 'transformers/resume-tooling.transformer';

function useController(props) {
  const content = useTransformer(props.tooling, createToolingContent);

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
