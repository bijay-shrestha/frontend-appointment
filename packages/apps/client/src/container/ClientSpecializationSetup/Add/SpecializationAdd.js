import React, {memo} from 'react'
import * as Material from 'react-icons/md'
import SubDepartMentForm from './SpecializationForm'
import SpecializationConfirmationModal from './SpecializationConfirmModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import SpecializationHoc from '../SpecializationSetupHoc'

function SpecializationAdd(props) {
    const SpecializationAdd = SpecializationHoc(({
                                                     specializationData,
                                                     handleEnter,
                                                     formValid,
                                                     resetStateAddValues,
                                                     errorMessageForSpecializationCode,
                                                     errorMessageForSpecializationName,
                                                     handleInputChange,
                                                     setShowConfirmModal,
                                                     showConfirmModal,
                                                     submitAddChanges,
                                                     alertMessageInfo,
                                                     showAlert,
                                                     closeAlert,
                                                 }) =>
            <div className="">
                <Container className="bg-white add-container " fluid>
                    <CButton
                        id="resetProfileForm"
                        variant="outline-secondary"
                        size="sm"
                        name=""
                        className="mb-2  float-right"
                        onClickHandler={resetStateAddValues}
                    >
                        <>
                            <i className="fa fa-refresh"/> &nbsp;Reset
                        </>
                    </CButton>
                    <SubDepartMentForm
                        specializationInfoObj={specializationData}
                        errorMessageForSpecializationName={errorMessageForSpecializationName}
                        errorMessageForSpecializationCode={errorMessageForSpecializationCode}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                    />

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name="Save"
                                disabled={!formValid}
                                onClickHandler={setShowConfirmModal}
                            />
                            <SpecializationConfirmationModal
                                showModal={showConfirmModal}
                                setShowModal={setShowConfirmModal}
                                onConfirmClick={submitAddChanges}
                                specializationData={specializationData}
                                type="A"
                            />
                        </Col>
                    </Row>
                    <CAlert
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={closeAlert}
                        alertType={
                            alertMessageInfo.variant === 'success' ? (
                                <>
                                    <Material.MdDone/>
                                </>
                            ) : (
                                <>
                                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                </>
                            )
                        }
                        message={alertMessageInfo.message}
                    />
                </Container>
            </div>
        , props, 'A');
    return <SpecializationAdd/>


}

// return <SpecializationAdd></SpecializationAdd>

export default memo(SpecializationAdd)
