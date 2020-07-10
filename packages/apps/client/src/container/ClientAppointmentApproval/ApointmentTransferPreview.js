import React, {memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import {TransferModalContent} from "@frontend-appointment/ui-components";

const AppointmentTransfer = props => {
    const {showModal, setShowModal, transferModalHandler} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Transfer Details"
                    size="xl"
                    bodyChildren={<TransferModalContent {...transferModalHandler}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal "
                    closeButton={true}
            />
        </>
    );
};

export default memo(AppointmentTransfer);
