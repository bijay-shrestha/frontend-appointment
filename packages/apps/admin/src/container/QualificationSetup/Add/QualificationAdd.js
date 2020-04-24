import React, {memo} from 'react'
import * as Material from 'react-icons/md'
import QualificationForm from './QualificationForm'
import QualificationConfirmationModal from './QualificationConfirmModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import QualificationHoc from '../QualificationSetupHoc'

function QualificationAdd(props) {
    const QualAdd = QualificationHoc(({
                                          qualificationData,
                                          handleEnter,
                                          formValid,
                                          resetStateAddValues,
                                          errorMessageForQualificationName,
                                          handleInputChange,
                                          setShowConfirmModal,
                                          showConfirmModal,
                                          submitAddChanges,
                                          alertMessageInfo,
                                          showAlert,
                                          closeAlert,
                                          qualificationsAliasForDropdown,
                                          qualificationsForDropdown,
                                          universitiesDropdown,
                                          createQualificationLoading
                                      }) =>
            <div className="">
                <Container className="bg-white add-container " fluid>
                    <CButton
                        id="resetProfileForm"
                        variant="outline-secondary"
                        size="sm"
                        name="Reset"
                        className="mb-2  float-right"
                        onClickHandler={resetStateAddValues}
                    >
                        <>
                            &nbsp;
                            <i className="fa fa-refresh"/>
                        </>
                    </CButton>
                    <QualificationForm
                        qualificationInfoObj={qualificationData}
                        errorMessageForQualificationName={errorMessageForQualificationName}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        //  countryCodeForDropdown={countryCodeForDropdown}
                        qualificationsAliasForDropdown={qualificationsAliasForDropdown}
                        qualificationsForDropdown={qualificationsForDropdown}
                        universitiesDropdown={universitiesDropdown}
                    />

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary"
                                className="float-right btn-action"
                                name={"Save"}
                                isLoading={showConfirmModal}
                                disabled={!formValid || showConfirmModal}
                                onClickHandler={setShowConfirmModal}
                            >

                            </CButton>
                            <QualificationConfirmationModal
                                showModal={showConfirmModal}
                                setShowModal={setShowConfirmModal}
                                onConfirmClick={submitAddChanges}
                                qualificationData={qualificationData}
                                createQualificationLoading={createQualificationLoading}
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
                                    <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                                </>
                            )
                        }
                        message={alertMessageInfo.message}
                    />
                </Container>
            </div>
        , props)
    return <QualAdd/>


}

export default QualificationAdd
