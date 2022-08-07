import ticomErp from 'public/ticom-erp.png';
import ticomErp1 from 'public/ticom-erp-1.png';
import ticomErp2 from 'public/ticom-erp-2.png';
import ticomErp3 from 'public/ticom-erp-3.png';
import { useMobileOnlyGuard } from 'hooks/useMobileOnlyGuard.hook';
import { useTransformer } from 'hooks/useTransformer.hook';
import { transformWorkExperienceToContent } from 'transformers/resume-work-experience.transformer';

const imageModules = [
  {
    image: ticomErp,
    alt: 'TICOM S.A ERP',
  },
  {
    image: ticomErp1,
    alt: 'TICOM S.A ERP - money management module example user experience',
  },
  {
    image: ticomErp2,
    alt: 'TICOM S.A ERP - money management module user experience',
  },
  {
    image: ticomErp3,
    alt: 'TICOM S.A ERP - cash flow module example user experience',
  },
];

function useController(props) {
  const { workExperienceCollectionItem } = props;

  const content = useTransformer(
    { workExperienceCollectionItem, imageModules },
    transformWorkExperienceToContent
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
