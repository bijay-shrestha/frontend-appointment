import React from 'react';
import {CModal} from '@frontend-appointment/ui-elements'

const OverrideRosterModal = ({overrideRosterModalProps}) => {
    const {
        showOverrideModal,
        isModifyOverride,
        setShowAddOverrideModal
    } = overrideRosterModalProps;
    return <>
        <CModal
            show={showOverrideModal}
            modalHeading={isModifyOverride ? "Modify Override" : "Override Doctor Duty Roster for"}
            size="md"
            bodyChildren={body}
            onHide={setShowAddOverrideModal}
            dialogClassName="preview-modal"
            footerChildren={footer}
        />
    </>
}

export default OverrideRosterModal;
