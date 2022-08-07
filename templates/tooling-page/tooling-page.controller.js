import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformToolingToContent } from 'transformers/resume-tooling.transformer';

function useController(props) {
  const content = useTransformer(
    props.toolingCollection,
    transformToolingToContent
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
