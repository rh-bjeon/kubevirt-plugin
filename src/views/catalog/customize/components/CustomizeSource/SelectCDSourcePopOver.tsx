import * as React from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

const SelectCDSourcePopOver: React.FC = () => {
  const { t } = useKubevirtTranslation();

  return (
    <Popover
      aria-label={'Help'}
      bodyContent={() => (
        <div>
          {t(
            'CD source represents the source for our disk, this can be HTTP, Registry or an existing PVC',
          )}
        </div>
      )}
    >
      <HelpIcon />
    </Popover>
  );
};

export default SelectCDSourcePopOver;
