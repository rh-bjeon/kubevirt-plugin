import React, { FC, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import SelectInstanceTypeSection from '@catalog/CreateFromInstanceTypes/components/SelectInstanceTypeSection/SelectInstanceTypeSection';
import VMDetailsSection from '@catalog/CreateFromInstanceTypes/components/VMDetailsSection/VMDetailsSection';
import HelpTextIcon from '@kubevirt-utils/components/HelpTextIcon/HelpTextIcon';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Card, Divider, Grid, GridItem, List, PopoverPosition } from '@patternfly/react-core';

import AddBootableVolumeButton from './components/AddBootableVolumeButton/AddBootableVolumeButton';
import BootableVolumeList from './components/BootableVolumeList/BootableVolumeList';
import CreateVMFooter from './components/CreateVMFooter/CreateVMFooter';
import SectionListItem from './components/SectionListItem/SectionListItem';
import { useInstanceTypeVMStore } from './state/useInstanceTypeVMStore';
import { INSTANCE_TYPES_SECTIONS } from './utils/constants';

import './CreateFromInstanceType.scss';

const CreateFromInstanceType: FC = () => {
  const { t } = useKubevirtTranslation();
  const sectionState = useState<INSTANCE_TYPES_SECTIONS>(INSTANCE_TYPES_SECTIONS.SELECT_VOLUME);

  const { resetInstanceTypeVMState } = useInstanceTypeVMStore();

  useEffect(() => resetInstanceTypeVMState(), [resetInstanceTypeVMState]);

  return (
    <>
      <Grid className="co-dashboard-body">
        <GridItem>
          <Card>
            <List className="create-vm-instance-type-section__list" isPlain>
              <SectionListItem
                headerText={
                  <>
                    {t('Select volume to boot from')}{' '}
                    <HelpTextIcon
                      bodyContent={
                        <>
                          <Trans ns="plugin__kubevirt-plugin" t={t}>
                            The Volume table displays DataSources and PersistentVolumeClaims that
                            VirtualMachines can boot from.
                            <div>
                              Click <b> Add volume</b> to boot from a volume that is not listed.
                            </div>
                          </Trans>
                        </>
                      }
                      className="create-vm-instance-type-section__HelpTextIcon"
                      position={PopoverPosition.right}
                    />
                  </>
                }
                headerAction={<AddBootableVolumeButton />}
                sectionKey={INSTANCE_TYPES_SECTIONS.SELECT_VOLUME}
                sectionState={sectionState}
              >
                <BootableVolumeList displayShowAllButton />
              </SectionListItem>

              <Divider className="create-vm-instance-type-section__divider" />

              <SectionListItem
                headerText={t('Select InstanceType')}
                sectionKey={INSTANCE_TYPES_SECTIONS.SELECT_INSTANCE_TYPE}
                sectionState={sectionState}
              >
                <SelectInstanceTypeSection />
              </SectionListItem>

              <Divider className="create-vm-instance-type-section__divider" />

              <SectionListItem
                headerText={t('VirtualMachine details')}
                sectionKey={INSTANCE_TYPES_SECTIONS.VM_DETAILS}
                sectionState={sectionState}
              >
                <VMDetailsSection />
              </SectionListItem>
            </List>
          </Card>
        </GridItem>
      </Grid>
      <CreateVMFooter />
    </>
  );
};

export default CreateFromInstanceType;
