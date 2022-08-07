import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformProfileToContent } from 'transformers/resume-profile.transformer';

function useController(props) {
  const content = useTransformer(
    props.profileRecord,
    transformProfileToContent
  );

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
