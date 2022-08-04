import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { createFunctionsContent } from 'transformers/resume-functions.transformer';

function useController(props) {
  const content = useTransformer(props.functions, createFunctionsContent);

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
