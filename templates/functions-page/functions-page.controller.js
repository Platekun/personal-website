import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformRoleFunctionsToContent } from 'transformers/resume-functions.transformer';

function useController(props) {
  const content = useTransformer(
    props.functionsCollection,
    transformRoleFunctionsToContent
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
