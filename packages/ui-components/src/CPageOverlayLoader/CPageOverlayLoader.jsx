import React from 'react'
import {CForm, CModal} from '@frontend-appointment/ui-elements'
import {Image} from 'react-bootstrap'

const CPageOverlayLoader = ({
                                showModal,
                                modalHeader,
                            }) => {
    const bodyContent = <>
        <Container-fluid>
            <CForm id="quick-checkin" className="mt-2">             
                    <div className="filter-message overlay-loading">
                        <div className="message-content">
                            <p className="process-message">{modalHeader}</p>
                            <Image src={require('./images/dot-loader-gray.svg')} className="loader"/>
                            {/* <span>Loading</span> */}
                        </div>
                    </div>
          
            </CForm>
        </Container-fluid>
    </>
    return (
        <>
            <CModal
                id={"loading-modal"}
                show={showModal}
                closeButton={false}
                // modalHeading={modalHeader}
                // onHide={setShowModal}
                size="sm"
                bodyChildren={bodyContent}
                backdrop="static"
                dialogClassName="cogent-modal"
            />
        </>
    )
}

export default CPageOverlayLoader
