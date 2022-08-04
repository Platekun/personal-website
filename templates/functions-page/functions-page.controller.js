import { useRedirectOnDesktop } from 'hooks/useRedirectOnDesktop.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createFunctionsContent } from 'transformers/resume-functions.transformer';

function useController(props) {
  const content = useTransformer(props.functions, createFunctionsContent);

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
